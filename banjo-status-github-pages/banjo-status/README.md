# Statusi i Banjos

Aplikacion i thjeshtë web që tregon nëse banjoja e zyrës është **e lirë** ose **e zënë**, në kohë reale, për të gjithë kolegët.

## Si funksionon

**Statusi live**
- Faqja tregon statusin aktual me ngjyra (jeshile = e lirë, e kuqe = e zënë).
- Çdo koleg mund të klikojë butonin për të ndryshuar statusin kur hyn ose del nga banjoja.
- Të gjithë ata që hapin faqen (nga telefoni ose kompjuteri) shohin të njëjtin status, sepse ai ruhet në server dhe faqja rifreskohet automatikisht çdo 5 sekonda.

**Kalendari i rezervimeve (si Google Calendar)**
- Poshtë statusit live ka një pamje ditore me oret (06:00–22:00), ku shfaqen terminet e rezervuara paraprakisht (p.sh. "12:30–12:40 · Arbeni").
- Çdo koleg mund të klikojë mbi grafikun në orën e dëshiruar (ose butonin "+ Rezervo") për të shtuar një termin me emrin dhe intervalin e kohës.
- Sistemi refuzon automatikisht dy rezervime që përputhen në kohë (nuk lejohen dy persona në të njëjtin interval).
- Mund të lëvizësh mes ditëve me shigjetat ‹ › ose të kthehesh te "Sot".
- Vija e kuqe horizontale tregon orën aktuale (vetëm kur je duke shikuar ditën e sotshme).
- Çdo termin mund të anulohet duke kaluar mausin sipër dhe duke klikuar × (ose me prekje të gjatë në telefon).

**Ruajtja e të dhënave**
- Statusi live ruhet në `status.json`, rezervimet ruhen në `bookings.json` - të dyja skedarë krijohen automatikisht dhe mbijetojnë rindezje të serverit.

## ⚠️ E RËNDËSISHME

**MOS e hap `docs/index.html` duke klikuar dy herë mbi të!** Faqja funksionon vetëm kur serveri (`server.js`) është duke punuar - ndryshe do të shfaqet "Nuk lidhet me serverin". Gjithmonë nise nëpërmjet skriptit më poshtë, ose me `npm start`, dhe hape adresën `http://localhost:3000` (jo skedarin direkt).

## Si e nis (menyra e thjeshte)

Node.js duhet i instaluar (shkarko nga [nodejs.org](https://nodejs.org), versioni LTS, nëse nuk e ke).

1. Shkarko/shpaketo këtë dosje në një kompjuter që qëndron i ndezur në zyrë (ose një Raspberry Pi).
2. Klik dopio (double-click) mbi:
   - **`start.bat`** nëse je në Windows
   - **`start.command`** nëse je në Mac
3. Do të hapet një dritare terminali (mos e mbyll - aty punon serveri) dhe shfletuesi do të hapet automatikisht te faqja.
4. Herën e parë mund të duhen disa sekonda shtesë sa instalohen paketat.

Nëse Mac-i thotë "nuk mund të hapet sepse është nga një zhvillues i pa-verifikuar", kliko me të djathtën mbi `start.command` → Open → konfirmo Open.

### Menyra manuale (nëse skriptet nuk punojnë)

Hap terminalin/command prompt në këtë dosje dhe shkruaj:

```
npm install
npm start
```

Do të shfaqet një mesazh si:

```
Banjo Status po punon ne http://localhost:3000
```

Hape këtë adresë (`http://localhost:3000`) në shfletues - **jo** skedarin `index.html`.

### Për ta hapur nga kolegët në rrjetin e zyrës

1. Gjej IP-n lokale të kompjuterit ku po punon serveri:
   - Windows: `ipconfig` (shiko "IPv4 Address")
   - Mac/Linux: `ifconfig` ose `ip addr` (shiko diçka si `192.168.1.23`)
2. Të gjithë kolegët në të njëjtin rrjet WiFi/zyre hapin në shfletuesin e tyre (telefon ose kompjuter):

   ```
   http://192.168.1.23:3000
   ```

   (zëvendëso me IP-n reale të kompjuterit ku po punon serveri)

3. Për ta pasur gjithmonë aktiv, lëre serverin të punojë vazhdimisht (mos mbyll dritaren e terminalit), ose përdor `pm2` për nisje automatike: `npm install -g pm2 && pm2 start server.js`.

## Nëse doni akses nga jashtë zyrës (interneti i gjerë)

Ky version është menduar për rrjetin e brendshëm të zyrës (pa kosto, pa llogari). Nëse doni që statusi të jetë i hapur nga interneti (jo vetëm nga WiFi-i i zyrës), do të duhej ta hostoni në një shërbim si Render, Railway, ose Fly.io (kanë plane falas) - mund të kërkoni ndihmë shtesë për këtë hap nëse ju interesons.

## Struktura e skedarëve

```
banjo-status/
├── start.bat           # Klik dopio për ta nisur në Windows
├── start.command        # Klik dopio për ta nisur në Mac
├── server.js           # Serveri Express + API (status live + rezervime)
├── package.json        # Varësitë
├── docs/
│   └── index.html      # Faqja që shohin kolegët (status + kalendar ditor)
├── status.json         # Krijohet automatikisht, ruan statusin live
└── bookings.json       # Krijohet automatikisht, ruan rezervimet
```
