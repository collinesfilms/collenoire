# Fichiers du film

Dépose ici deux fichiers, nommés exactement ainsi — la page les cherche par ce nom :

| Fichier | Rôle |
|---|---|
| `film.mp4` | Le film, en H.264 |
| `poster.jpg` | L'image fixe avant lecture |

Tant qu'ils ne sont pas là, la page affiche un carré noir avec le bouton de
lecture. C'est normal.

## Pourquoi du H.264 et pas ton H.265

Le H.265 ne se lit ni sur Chrome ni sur Firefox Android : environ un tiers des
téléphones qui scanneront le QR n'auraient eu qu'un carré noir. Le H.264 se lit
partout, sans exception utile. Un seul fichier, personne dehors.

## Encodage

Le plafond dur de GitHub est de **100 Mo par fichier**. Pour 4:30 de film, ça
laisse environ 2,9 Mbps — large pour du 1080×1080. Vérifie la taille avant de
publier.

```bash
# Le film
ffmpeg -i master.mov \
  -c:v libx264 -profile:v high -pix_fmt yuv420p -crf 21 -preset slow \
  -c:a aac -b:a 192k \
  -movflags +faststart \
  film.mp4

# L'affiche — choisis la seconde qui te plaît
ffmpeg -i master.mov -ss 00:00:03 -frames:v 1 -q:v 2 poster.jpg
```

`-movflags +faststart` déplace l'index au début du fichier. Sans ça, le
téléphone télécharge le film entier avant d'afficher la première image.

`-pix_fmt yuv420p` n'est pas décoratif : sans ça, un master en 4:2:2 produit un
MP4 que les téléphones refusent.

`-crf` règle la qualité : plus bas = plus beau et plus lourd. Si tu dépasses
100 Mo, monte le CRF de 2 ou 3 et réencode.
