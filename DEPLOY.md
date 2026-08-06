# Si ta vendos online (jo vetëm në WiFi-n e zyrës)

Aplikacioni ashtu si është (duke u nisur nga kompjuteri yt me `start.bat`/`start.command`) funksionon vetëm brenda rrjetit të zyrës. Për ta bërë të hapur nga kudo në internet (p.sh. koleg që punon nga shtëpia, ose nga celulari me 4G), duhet ta "hostosh" në një server online. Këtu janë dy rrugë falas.

---

## Opsioni A - Render.com (më i lehtë, rekomandohet për fillim)

**Kujdes:** Render, në planin falas, e "fikë" shërbimin kur nuk përdoret për ~15 minuta (kërkesa e parë pas kësaj merr ~30-50 sekonda për t'u ngritur përsëri), dhe skedarët `status.json`/`bookings.json` **mund të rivendosen (fshihen)** çdo herë që shërbimi rindizet ose ribëhet deploy. Për një aplikacion të vogël si ky, kjo zakonisht është e pranueshme - por nëse të dhënat e rezervimeve duhet të mos humbin kurrë, shko te Opsioni B.

### Hapat

1. **Krijo një llogari GitHub falas** (nëse nuk ke): [github.com/signup](https://github.com/signup)

2. **Krijo një repository të re:**
   - Kliko "New repository" (butoni jeshil)
   - Emërto p.sh. `banjo-status`
   - Zgjidh "Public" ose "Private" (të dyja funksionojnë me Render falas)
   - Kliko "Create repository"

3. **Ngarko skedarët e projektit** (pa pasur nevojë për `git` në terminal):
   - Në faqen e repository-t të ri, kliko "uploading an existing file"
   - Shpaketo `banjo-status.zip` në kompjuterin tënd dhe tërhiq/lësho (drag & drop) të gjithë skedarët dhe dosjen `public/` brenda
   - Kliko "Commit changes"

4. **Krijo llogari Render falas:** [render.com](https://render.com) → "Get Started" → mund të regjistrohesh direkt me llogarinë GitHub (më e shpejtë).

5. **Krijo një "Web Service" të re:**
   - Në Render, kliko "New +" → "Web Service"
   - Zgjidh repository-n `banjo-status` që sapo krijove
   - Render do t'i zbulojë vetë konfigurimet, por sigurohu që:
     - **Build Command:** `npm install`
     - **Start Command:** `npm start`
     - **Plan:** Free
   - Kliko "Create Web Service"

6. Prit disa minuta sa bëhet build & deploy. Kur mbaron, Render të jep një adresë si:

   ```
   https://banjo-status.onrender.com
   ```

7. Hape këtë adresë nga çdo pajisje me internet - kolegët mund ta ruajnë si "bookmark" ose shkurtore në ekranin e telefonit.

### Kur bën ndryshime më vonë

Nëse dëshiron të ndryshosh diçka në kod, ngarko skedarin e ri në GitHub (hapi 3), dhe Render do ta rindërtojë automatikisht brenda pak minutash.

---

## Opsioni B - Fly.io (ruajtje e përhershme e të dhënave, pak më teknik)

Nëse do që rezervimet e kalendarit të mos humbasin kurrë, Fly.io ofron disk të përhershëm (persistent volume) falas deri në një kufi të vogël, i mjaftueshëm për këtë aplikacion.

Ky opsion kërkon instalimin e një vegle në terminal (`flyctl`) dhe disa komanda shtesë. Nëse dëshiron ta ndjekësh këtë rrugë, më thuaj dhe të drejtoj hap pas hapi (ose mund të të përgatis skedarët e konfigurimit `fly.toml` që të duhen).

---

## Shënim për sigurinë

Aplikacioni siç është nuk ka fjalëkalim/kyçje - kushdo që ka lidhjen (URL-në) mund ta shohë dhe ndryshojë statusin ose rezervimet. Për një mjet të brendshëm zyre kjo zakonisht nuk është problem, por mos e ndaj lidhjen publikisht (p.sh. në rrjete sociale) nëse nuk do që të huaj ta përdorin.
