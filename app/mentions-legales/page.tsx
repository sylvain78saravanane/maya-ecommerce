const MentionsLegales = () => {
  return (
    <main className="container mx-auto px-4 py-12" style={{ marginTop: "5rem", maxWidth: "800px" }}>
      <h1 className="text-4xl font-bold mb-8 text-center">Mentions Légales</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Éditeur du site</h2>
        <p>
          Le site <strong>MAYA</strong> est édité par la société <strong>MAYA</strong>, société à responsabilité limitée au capital de [Capital social], immatriculée au Registre du Commerce et des Sociétés sous le numéro [SIREN/SIRET], dont le siège social est situé au :
        </p>
        <address className="not-italic mb-4">
          [Adresse complète de la société] <br />
          Téléphone : [Numéro de téléphone] <br />
          Email : <a href="mailto:contact@maya.com" className="text-accent hover:underline">contact@maya.com</a>
        </address>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">2. Directeur de la publication</h2>
        <p>
          Le directeur de la publication est <strong>[Nom et prénom du responsable]</strong>.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">3. Hébergement</h2>
        <p>
          Le site est hébergé par : <br />
          <strong>Vercel</strong> <br />
          Adresse : [Adresse complète de l’hébergeur] <br />
          Téléphone : [Numéro de téléphone de l’hébergeur]
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">4. Propriété intellectuelle</h2>
        <p>
          L'ensemble des contenus présents sur ce site (textes, images, logos, vidéos, etc.) sont la propriété exclusive de la société MAYA ou de ses partenaires, et sont protégés par les lois relatives à la propriété intellectuelle.
        </p>
        <p>
          Toute reproduction, distribution, modification ou utilisation de ces contenus sans autorisation écrite préalable est strictement interdite.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">5. Données personnelles</h2>
        <p>
          Conformément à la loi « Informatique et Libertés » et au Règlement Général sur la Protection des Données (RGPD), vous disposez d’un droit d’accès, de rectification et de suppression des données vous concernant.
        </p>
        <p>
          Pour exercer ces droits, vous pouvez nous contacter à l'adresse email : <a href="mailto:contact@maya.com" className="text-accent hover:underline">contact@maya.com</a>.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">6. Cookies</h2>
        <p>
          Ce site utilise des cookies pour améliorer votre expérience utilisateur. Vous pouvez configurer votre navigateur pour refuser les cookies, mais certaines fonctionnalités pourraient être limitées.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">7. Responsabilité</h2>
        <p>
          La société MAYA ne saurait être tenue responsable des dommages directs ou indirects résultant de l'accès ou de l'utilisation du site, ainsi que des informations qui y sont contenues.
        </p>
      </section>
    </main>
  )
}

export default MentionsLegales
