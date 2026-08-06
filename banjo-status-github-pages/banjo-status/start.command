#!/bin/bash
cd "$(dirname "$0")"

if ! command -v node >/dev/null 2>&1; then
  echo ""
  echo "GABIM: Node.js nuk eshte i instaluar ne kete kompjuter."
  echo "Shkarkoje nga https://nodejs.org (versioni LTS) dhe provo perseri."
  echo ""
  read -p "Shtyp Enter per te mbyllur..."
  exit 1
fi

if [ ! -d "node_modules" ]; then
  echo "Po instalohen paketat per here te pare, prit pak..."
  npm install
fi

echo ""
echo "Duke nisur serverin... MOS E MBYLL kete dritare Terminal sa kohe do ta perdorni aplikacionin."
echo ""

(sleep 3 && open http://localhost:3000) &
npm start
