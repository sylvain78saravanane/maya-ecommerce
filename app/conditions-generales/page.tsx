const CGV = () => {
  return (
    <main className="container mx-auto px-4 py-12" style={{ marginTop: "5rem", maxWidth: "800px" }}>
      <h1 className="text-4xl font-bold mb-8 text-center">Conditions Générales de Vente</h1>

      <section className="mb-8">
        <p>
          Les présentes <strong>conditions générales de vente</strong> (CGV) régissent les relations contractuelles entre la société <strong>MAYA</strong> et ses clients. En passant commande, vous acceptez sans réserve ces conditions.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Acceptation des CGV</h2>
        <p>
          En validant votre commande, vous confirmez avoir pris connaissance et accepté sans réserve les présentes CGV.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">2. Produits</h2>
        <p>
          Les produits proposés à la vente sont ceux décrits sur le site au moment de la commande. Les photographies ont une valeur indicative et ne sauraient engager la responsabilité de la société MAYA.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">3. Prix</h2>
        <p>
          Les prix sont indiqués en euros, toutes taxes comprises (TTC). La société MAYA se réserve le droit de modifier ses tarifs à tout moment sans préavis. Les commandes sont facturées sur la base des tarifs en vigueur au moment de la validation.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">4. Commande</h2>
        <p>
          La commande devient ferme et définitive une fois le paiement validé. Toute commande implique l’acceptation des présentes CGV.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">5. Paiement</h2>
        <p>
          Le paiement s'effectue via les moyens sécurisés proposés sur le site, notamment carte bancaire. La transaction est sécurisée et vos données bancaires sont protégées.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">6. Livraison</h2>
        <p>
          Les délais de livraison indiqués sont à titre indicatif. Ils peuvent varier selon la disponibilité des produits et le mode de livraison choisi.
        </p>
        <p>
          Les frais de livraison sont précisés au moment de la commande.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">7. Droit de rétractation</h2>
        <p>
          Conformément à la législation, vous disposez d’un délai de 14 jours calendaires à compter de la réception du produit pour exercer votre droit de rétractation sans motif ni pénalité.
        </p>
        <p>
          Pour exercer ce droit, veuillez contacter notre service client à l’adresse suivante :
        </p>
        <address className="not-italic mb-4">
          <a href="mailto:contact@maya.com" className="text-accent hover:underline">contact@maya.com</a>
        </address>
      </section>

      <section>
        <p className="text-sm text-muted-foreground text-center">
          Pour toute question, n’hésitez pas à nous contacter via notre page <a href="/contact" className="text-accent underline">Contact</a>.
        </p>
      </section>
    </main>
  )
}

export default CGV
