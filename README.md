Clonez ce dépôt:
```
git clone https://github.com/sylvain78saravanane/maya-ecommerce
```
cd maya-ecommerce

Installez les dépendances:
``````
npm install
# ou
yarn install

Configurez les variables d'environnement:
Créez un fichier .env à la racine du projet avec le contenu suivant:
DATABASE_URL="mysql://user:password@localhost:3306/maya_db"
JWT_SECRET="votre_secret_jwt_très_sécurisé"
ADMIN_CODE="MAYA-ADMIN-2024"

Initialisez la base de données avec Prisma:
npx prisma migrate dev --name init

Lancez le serveur de développement:
npm run dev
# ou
yarn dev

L'application sera disponible à l'adresse: http://localhost:3000