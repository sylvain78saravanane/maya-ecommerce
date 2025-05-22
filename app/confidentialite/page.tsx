const Confidentialite = () => {
  return (
    <main className="container mx-auto px-4 py-12" style={{ marginTop: "5rem", maxWidth: "800px" }}>
      <h1 className="text-4xl font-bold mb-8 text-center">Politique de Confidentialité</h1>

      <section className="mb-8">
        <p>
          La société <strong>MAYA</strong> attache une grande importance à la protection de vos données personnelles. Cette politique de confidentialité vous informe sur la collecte, l’utilisation et la protection des informations que vous nous communiquez via notre site.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Données collectées</h2>
        <p>
          Nous collectons les données suivantes :
        </p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>Informations d’identification (nom, prénom, email, adresse)</li>
          <li>Informations de paiement (numéro de carte bancaire, sécurisées via Stripe)</li>
          <li>Données de navigation (cookies, adresse IP, comportement sur le site)</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">2. Finalité du traitement</h2>
        <p>
          Les données collectées sont utilisées pour :
        </p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>Gérer vos commandes et paiements</li>
          <li>Améliorer notre site et personnaliser votre expérience</li>
          <li>Vous informer sur nos produits, offres et nouveautés (avec votre consentement)</li>
          <li>Respecter nos obligations légales et réglementaires</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">3. Partage des données</h2>
        <p>
          Vos données personnelles ne sont jamais vendues à des tiers. Elles peuvent être partagées uniquement avec :
        </p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>Notre prestataire de paiement : STRIPE Payments</li>
          <li>Nos partenaires logistiques pour la livraison : Chronopost</li>
          <li>Les autorités légales si la loi l’exige</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">4. Sécurité</h2>
        <p>
          Nous mettons en place des mesures techniques et organisationnelles pour protéger vos données contre tout accès non autorisé, perte ou divulgation.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">5. Vos droits</h2>
        <p>
          Conformément au RGPD, vous disposez des droits suivants sur vos données personnelles :
        </p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>Droit d’accès et de rectification</li>
          <li>Droit à l’effacement (droit à l’oubli)</li>
          <li>Droit à la limitation du traitement</li>
          <li>Droit d’opposition</li>
          <li>Droit à la portabilité des données</li>
          <li>Droit de retirer votre consentement à tout moment</li>
        </ul>
        <p className="mt-4">
          Pour exercer ces droits, vous pouvez nous contacter à l’adresse : <a href="mailto:contact@maya.com" className="text-accent hover:underline">contact@maya.com</a>.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">6. Cookies</h2>
        <p>
          Notre site utilise des cookies pour optimiser votre navigation. Vous pouvez gérer vos préférences en matière de cookies via les paramètres de votre navigateur.
        </p>
      </section>
    </main>
  )
}

export default Confidentialite
