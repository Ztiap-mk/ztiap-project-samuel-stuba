ZTIAP hra Paratrooper - Samuel Piják

- commit hlavneho html suboru a priecinku img s obrazkami
- vytvorenie suboru main.js a prepisanie index.html aby vykonaval script main.js
- premenovanie suboru index.html na paratrooper.html
- main.js: vytvorenie triedy Paratrooper; vymazanie zbytocneho kodu; rozpohybovanie postavy paratrooper; pridanie obrazku crosshair.png do dir img
- vytvorenie triedy Heli
- snaha vytvorit funkciu na detekovanie suradnic mysky na canvase
- funkcia onmousemove dorobena, len ju treba doladit aby vykreslovala crosshair na pozicii kurzora mysi
- vytvorenie suborov menu - menu.html odkazuje na menu.js v ktorom sa vykresluje obdlznik s textom "Play Game" reagujuci na kliknutie mysi - kliknutie na Play Game otvori subor paratrooper.html; v main.js som pridal vykreslovanie pozadia hry
- pridanie funkcie na output klavesnice
- vytvorenie triedy Player - respektuje hranice canvasu (podmienka ak z neho vykroci este nie je dokoncena); Player sa pohybuje pomocou vystupu z klavesnice; upravenie vysky canvasu aby sa zhodoval s velkostou pozadia
- ak sa Player pohne na kraj canvasu tak sa zastavi animaci a vykresli sa tlacidlo "Play Again", ktore znova hru spusti
