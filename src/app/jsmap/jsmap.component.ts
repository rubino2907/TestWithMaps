import { CommonModule } from '@angular/common';
import { Component, ViewChild, ElementRef, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import H from '@here/maps-api-for-javascript';
import onResize from 'simple-element-resize-detector';
import { MappositionComponent } from '../mapposition/mapposition.component';
import {MatMenuModule} from '@angular/material/menu';

@Component({
  selector: 'app-jsmap',
  standalone: true,
  imports: [CommonModule, MappositionComponent, MatMenuModule],
  templateUrl: './jsmap.component.html',
  styleUrls: ['./jsmap.component.css']
})
export class JsmapComponent {

  private map?: H.Map;
  private ui?: H.ui.UI;
  draw: any;
  private isSatellite = false; // Flag para controlar se o mapa está em modo satélite
  // Propriedade para armazenar a coleção dos marcadores
  collections: any[] = []; // Para armazenar as coleções

  landmarks: any[] = [  // Definindo landmarks como uma propriedade da classe
    { name: 'Notre-Dame Cathedral', lat: 49.610364, lng: 6.129416, label: 'NDC', collection: 'Teste' },
    { name: 'Grand Ducal Palace', lat: 49.611204, lng: 6.130720, label: 'GDP', collection: 'Teste' },
    { name: 'Casemates du Bock', lat: 49.611847, lng: 6.131925, label: 'CdB', collection: 'Teste' },
    { name: 'Adolphe Bridge', lat: 49.6083, lng: 6.127109, label: 'AB', collection: '' },
  ];

  @ViewChild('map') mapDiv?: ElementRef;

  ngAfterViewInit(): void {
    this.loadLandmarksFromLocalStorage(); // Carrega os marcadores da local storage
    if (!this.map && this.mapDiv) {
      // Api hereMaps
      const platform = new H.service.Platform({
        apikey: 'ZZySbRM6Hi6Er4XgNf7ebnErrOWZpHKkQAt-OxpYz0Q'
      });
      const layers = platform.createDefaultLayers();

      // Inicializa o mapa
      const map = new H.Map(
        this.mapDiv.nativeElement,
        (layers as any).vector.normal.map,
        {
          pixelRatio: window.devicePixelRatio,
          zoom: 16,
          center: { lat: 49.6107, lng: 6.1314 }
        },
      );
      this.map = map;

      this.ui = H.ui.UI.createDefault(this.map, layers);

      // Add the resize handler
      onResize(this.mapDiv.nativeElement, () => {
        map.getViewPort().resize();
      });

      map.addEventListener('mapviewchange', (ev: H.map.ChangeEvent) => {
        this.notify.emit(ev)
      });

      // Adicionar ouvinte de evento de clique no mapa após a inicialização
      this.adicionarOuvinteCliqueMapa();
      
      // Adicionar os pontos de interesse (landmarks)
      this.landmarks.forEach(landmark => {
        const marker = new H.map.Marker({ lat: landmark.lat, lng: landmark.lng });
        marker.setData({ name: landmark.name, lat: landmark.lat, lng: landmark.lng }); // Definir os dados do marcador para incluir as coordenadas
        map.addObject(marker);
        console.log('Dados Marker: ', landmark.name);

        // Variável para armazenar a referência ao InfoBubble atual
        let currentBubble: H.ui.InfoBubble | null = null;

        marker.addEventListener('pointerenter', (event: any) => {
          const markerData = event.target.getData(); // Obtém os dados do marcador

          // Cria o conteúdo do infobubble com base nos dados do marcador
          const bubbleContent = `
            <div class="info-bubble-content">
              <p><strong>Name:</strong> ${markerData.name}</p>
              <p><strong>Latitude:</strong> ${markerData.lat}</p>
              <p><strong>Longitude:</strong> ${markerData.lng}</p>
            </div>
          `;

          // Cria um novo infobubble com o conteúdo personalizado
          const bubble = new H.ui.InfoBubble(event.target.getGeometry(), {
            content: bubbleContent
          });

          // Adiciona o infobubble ao UI do mapa
          this.ui?.addBubble(bubble);

          // Remove o botão de fechar do DOM se o InfoBubble for criado com sucesso
          const bubbleElement = bubble.getElement();
          if (bubbleElement) {
            const closeButton = bubbleElement.querySelector('.H_ib_close');
            if (closeButton) {
              closeButton.remove();
            }
          }

          // Atualiza a referência para o novo InfoBubble
          currentBubble = bubble;

        });

        marker.addEventListener('pointerleave', () => {
          // Remove o InfoBubble atual, se existir
          if (currentBubble) {
            this.ui?.removeBubble(currentBubble);
            currentBubble = null; // Limpa a referência ao InfoBubble atual
          }
        });
        
      });

      new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
      
    }
    
  }

  // Método para carregar coleções do localStorage
  private loadCollectionsFromLocalStorage(): void {
    const storedCollections = localStorage.getItem('collections');
    if (storedCollections) {
      this.collections = JSON.parse(storedCollections);
    }
  }

  // Métodos para salvar e carregar landmarks do localStorage
  private saveLandmarksToLocalStorage(): void {
    localStorage.setItem('landmarks', JSON.stringify(this.landmarks));
  }
  
  private loadLandmarksFromLocalStorage(): void {
    const storedLandmarks = localStorage.getItem('landmarks');
    if (storedLandmarks) {
      this.landmarks = JSON.parse(storedLandmarks);
    }
  }

  @Input() public zoom = 2;
  @Input() public lat = 0;
  @Input() public lng = 0;

  private timeoutHandle: any;
  @Output() notify = new EventEmitter();

  ngOnChanges(changes: SimpleChanges) {
    clearTimeout(this.timeoutHandle);
    this.timeoutHandle = setTimeout(() => {
      if (this.map) {
        if (changes['zoom'] !== undefined) {
          this.map.setZoom(changes['zoom'].currentValue);
        }
        if (changes['lat'] !== undefined) {
          this.map.setCenter({ lat: changes['lat'].currentValue, lng: this.lng });
        }
        if (changes['lng'] !== undefined) {
          this.map.setCenter({ lat: this.lat, lng: changes['lng'].currentValue });
        }
      }
    }, 100);
  }

  criarMarcador() {
    this.adicionarOuvinteCliqueMapa(); // Adiciona ouvinte de evento de clique no mapa
    this.saveLandmarksToLocalStorage();
  }

  private adicionarOuvinteCliqueMapa() {
    if (this.map) {
      // Remove todos os ouvintes de evento de clique para evitar múltiplos ouvintes
      this.map.removeEventListener('dbltap', () => { }); // Remove o ouvinte padrão de clique duplo
  
      // Adiciona um novo ouvinte de evento de clique ao mapa
      this.map.addEventListener('dbltap', (ev: H.mapevents.Event) => {
        // Obtém as coordenadas do clique
        const pointer = ev.currentPointer;
        const pointerPosition = this.map?.screenToGeo(pointer.viewportX, pointer.viewportY);
  
        // Verifica se pointerPosition é null antes de acessar suas propriedades
        if (pointerPosition) {
          const lat = pointerPosition.lat;
          const lng = pointerPosition.lng;
  
          // Exibe um popup de entrada de texto para o usuário inserir o nome do marcador
          const markerName = prompt('Por favor, insira um nome para o marcador:');
          const collection = prompt('Por favor, insira a coleção para o marcador:');
          if (markerName !== null && markerName !== '' && collection !== null) {
            const newMarker = {
              name: markerName,
              lat: lat,
              lng: lng,
              label: 'NM',
              collection: collection // Adiciona a coleção ao novo marcador
            };
  
            // Adiciona o novo marcador ao array landmarks
            this.landmarks.push(newMarker);
  
            // Cria e adiciona o marcador ao mapa
            const marker = new H.map.Marker({ lat: newMarker.lat, lng: newMarker.lng });
            marker.setData(newMarker.name);
            this.map?.addObject(marker);
  
            // Variável para armazenar a referência ao InfoBubble atual
            let currentBubble: H.ui.InfoBubble | null = null;
  
            // Armazena os dados do marcador em uma variável acessível pelos eventos
            const markerData = newMarker;
  
            // Adiciona um ouvinte de evento de pointerenter para o novo marcador
            marker.addEventListener('pointerenter', (event: any) => {
              // Cria o conteúdo do infobubble com base nos dados do marcador
              const bubbleContent = `
                <div class="info-bubble-content">
                  <p><strong>Name:</strong> ${markerData.name}</p>
                  <p><strong>Latitude:</strong> ${markerData.lat}</p>
                  <p><strong>Longitude:</strong> ${markerData.lng}</p>
                </div>
              `;
  
              // Cria um novo infobubble com o conteúdo personalizado
              const bubble = new H.ui.InfoBubble(event.target.getGeometry(), {
                content: bubbleContent
              });
  
              // Adiciona o infobubble ao UI do mapa
              this.ui?.addBubble(bubble);
  
              // Remove o botão de fechar do DOM se o InfoBubble for criado com sucesso
              const bubbleElement = bubble.getElement();
              if (bubbleElement) {
                const closeButton = bubbleElement.querySelector('.H_ib_close');
                if (closeButton) {
                  closeButton.remove();
                }
              }
  
              // Atualiza a referência para o novo InfoBubble
              currentBubble = bubble;
            });
  
            // Adiciona um ouvinte de evento de pointerleave para o novo marcador
            marker.addEventListener('pointerleave', () => {
              // Remove o InfoBubble atual, se existir
              if (currentBubble) {
                this.ui?.removeBubble(currentBubble);
                currentBubble = null; // Limpa a referência ao InfoBubble atual
              }
            });
          }
        } else {
          console.error('pointerPosition é null');
        }
      });
    } else {
      console.error('this.map está undefined');
    }
  }
  

  DeleteMarks() {
    // Verifica se o mapa está definido
    if (this.map) {
      // Remove todos os objetos do mapa
      this.map.removeObjects(this.map.getObjects());
      
      // Limpa os landmarks da local storage
      localStorage.removeItem('landmarks');
    } else {
      console.error('this.map está undefined');
    }
  }


  GetLandMarks() {
    console.log('Entrou na função GetLandMarks');
    
    // Remover todos os marcadores existentes antes de adicionar novos
    if (this.map) {
      this.map.removeObjects(this.map.getObjects());
    }
  
    // Adicionar novos marcadores do array landmarks
    if (this.map) {
      console.log('this.map existe:', this.map);
      this.saveLandmarksToLocalStorage();
      
      this.landmarks.forEach(landmark => {
        console.log('Criando marcador para:', landmark.name);
        const marker = new H.map.Marker({ lat: landmark.lat, lng: landmark.lng });
        marker.setData(landmark.name);
        console.log('Marcador criado:', marker);
        if (this.map) {
          console.log('Adicionando marcador ao mapa:', marker);
          this.map.addObject(marker);
        } else {
          console.error('this.map está undefined');
        }
    
        // Variável para armazenar a referência ao InfoBubble atual
        let currentBubble: H.ui.InfoBubble | null = null;
    
        // Adiciona um ouvinte de evento de pointerenter para o novo marcador
        marker.addEventListener('pointerenter', (event: any) => {
          // Cria o conteúdo do infobubble com base nos dados do marcador
          const bubbleContent = `
            <div class="info-bubble-content">
              <p><strong>Name:</strong> ${landmark.name}</p>
              <p><strong>Latitude:</strong> ${landmark.lat}</p>
              <p><strong>Longitude:</strong> ${landmark.lng}</p>
            </div>
          `;
  
          // Cria um novo infobubble com o conteúdo personalizado
          const bubble = new H.ui.InfoBubble(event.target.getGeometry(), {
            content: bubbleContent
          });
  
          // Adiciona o infobubble ao UI do mapa
          this.ui?.addBubble(bubble);
  
          // Remove o botão de fechar do DOM se o InfoBubble for criado com sucesso
          const bubbleElement = bubble.getElement();
          if (bubbleElement) {
            const closeButton = bubbleElement.querySelector('.H_ib_close');
            if (closeButton) {
              closeButton.remove();
            }
          }
  
          // Atualiza a referência para o novo InfoBubble
          currentBubble = bubble;
        });
  
        // Adiciona um ouvinte de evento de pointerleave para o novo marcador
        marker.addEventListener('pointerleave', () => {
          // Remove o InfoBubble atual, se existir
          if (currentBubble) {
            this.ui?.removeBubble(currentBubble);
            currentBubble = null; // Limpa a referência ao InfoBubble atual
          }
        });
      });
    } else {
      console.error('this.map está undefined');
    }
  }
  
  SateliteMap() {
    if (this.map) {
      const platform = new H.service.Platform({
        apikey: 'ZZySbRM6Hi6Er4XgNf7ebnErrOWZpHKkQAt-OxpYz0Q'
      });
      const layers = platform.createDefaultLayers();

      // Verifica o estado atual do mapa (normal ou satélite) e alterna para o oposto
      const layerType = this.isSatellite ? (layers as any).vector.normal.map : (layers as any).raster.satellite.map;
      this.map.setBaseLayer(layerType);

      // Atualiza o estado do botão
      this.isSatellite = !this.isSatellite;
    }
  }
  ListByCollection(){

  }
}
