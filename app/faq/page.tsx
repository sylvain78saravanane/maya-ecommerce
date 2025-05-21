import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata = {
  title: "Foire Aux Questions | MAYA",
  description: "Trouvez les réponses à vos questions sur nos produits, commandes, livraisons et notre politique de retour.",
}

const FaqPage = () => {
  // Les questions sont regroupées par catégorie pour une meilleure organisation
  const faqCategories = [
    {
      title: "Produits",
      questions: [
        {
          question: "Comment sont fabriqués vos sacs ?",
          answer: "Tous nos sacs sont fabriqués à la main avec des techniques traditionnelles de crochet. Chaque pièce est unique et réalisée avec soin par nos artisans qualifiés. Nous utilisons des fils de coton biologique et des matériaux durables pour garantir la qualité et la longévité de nos produits."
        },
        {
          question: "Quels matériaux utilisez-vous ?",
          answer: "Nous utilisons principalement du coton biologique certifié pour nos créations. Pour certains modèles, nous incorporons également d'autres matériaux naturels comme le jute, le raphia ou des accessoires en bois. Tous nos matériaux sont sélectionnés avec soin pour leur qualité et leur respect de l'environnement."
        },
        {
          question: "Vos sacs sont-ils résistants ?",
          answer: "Oui, nos sacs sont conçus pour être à la fois esthétiques et durables. La technique du crochet permet de créer des structures solides qui conservent leur forme dans le temps. Nos produits sont renforcés aux points de tension et testés pour résister à une utilisation quotidienne. Avec un entretien approprié, votre sac MAYA vous accompagnera pendant de nombreuses années."
        },
        {
          question: "Comment entretenir mon sac en crochet ?",
          answer: "Pour préserver la beauté de votre sac MAYA, nous recommandons un nettoyage à sec ou un lavage délicat à la main avec une eau tiède et un savon doux en cas de nécessité. Évitez de frotter vigoureusement, de tordre le tissu ou d'utiliser des produits chimiques agressifs. Laissez sécher à plat, loin de la lumière directe du soleil. Pour les taches légères, utilisez une brosse douce ou une éponge humide."
        },
      ]
    },
    {
      title: "Commandes et Paiements",
      questions: [
        {
          question: "Comment puis-je passer une commande ?",
          answer: "Vous pouvez commander directement sur notre site web. Parcourez notre boutique, sélectionnez les produits qui vous plaisent et ajoutez-les à votre panier. Une fois vos achats terminés, procédez au paiement en suivant les étapes indiquées. Vous recevrez une confirmation de commande par email une fois votre achat validé."
        },
        {
          question: "Quels modes de paiement acceptez-vous ?",
          answer: "Nous acceptons les paiements par carte bancaire (Visa, MasterCard, American Express), PayPal, et Apple Pay. Tous les paiements sont sécurisés et vos informations personnelles sont protégées grâce à notre système de cryptage."
        },
        {
          question: "Puis-je modifier ou annuler ma commande ?",
          answer: "Vous pouvez modifier ou annuler votre commande dans l'heure qui suit sa validation. Pour ce faire, contactez notre service client par email à contact@maya-bags.com ou par téléphone. Au-delà de ce délai, votre commande sera en cours de préparation et nous ne pourrons plus la modifier ou l'annuler, mais vous pourrez toujours effectuer un retour selon nos conditions."
        },
        {
          question: "Proposez-vous des remises ou programmes de fidélité ?",
          answer: "Oui, nous proposons régulièrement des offres spéciales à nos clients. Inscrivez-vous à notre newsletter pour recevoir 15% de réduction sur votre première commande et être informé de nos promotions. Nous avons également un programme de fidélité qui vous permet de cumuler des points à chaque achat, échangeables contre des réductions ou des cadeaux exclusifs."
        },
      ]
    },
    {
      title: "Livraisons et Retours",
      questions: [
        {
          question: "Où livrez-vous ?",
          answer: "Nous livrons dans toute l'Union Européenne, ainsi qu'en Suisse, au Royaume-Uni, aux États-Unis, au Canada, en Australie et au Japon. Si votre pays ne figure pas dans cette liste, contactez-nous pour vérifier si la livraison est possible."
        },
        {
          question: "Quels sont les délais de livraison ?",
          answer: "Pour la France métropolitaine, comptez 2-3 jours ouvrables. Pour l'Union Européenne, 3-5 jours ouvrables. Pour les autres destinations internationales, les délais varient entre 5 et 10 jours ouvrables. Ces délais sont indicatifs et peuvent varier en fonction des périodes d'activité ou d'événements exceptionnels."
        },
        {
          question: "Comment suivre ma commande ?",
          answer: "Une fois votre commande expédiée, vous recevrez un email avec un numéro de suivi et un lien vous permettant de suivre votre colis en temps réel. Vous pouvez également consulter l'état de votre commande dans votre espace client sur notre site."
        },
        {
          question: "Comment effectuer un retour ?",
          answer: "Vous disposez de 14 jours après réception de votre commande pour nous retourner un produit qui ne vous conviendrait pas. Pour effectuer un retour, connectez-vous à votre compte client, allez dans la section 'Mes commandes' et suivez la procédure de retour. Une fois votre demande validée, vous recevrez par email une étiquette de retour à imprimer. Les frais de retour sont à votre charge, sauf en cas de produit défectueux ou d'erreur de notre part."
        },
        {
          question: "Dans quel délai serai-je remboursé(e) ?",
          answer: "Une fois votre retour reçu et validé par notre équipe, le remboursement sera effectué dans un délai de 5 jours ouvrables, sur le même moyen de paiement que celui utilisé lors de votre achat. Vous recevrez une confirmation par email lorsque le remboursement aura été traité."
        },
      ]
    },
    {
      title: "À propos de MAYA",
      questions: [
        {
          question: "Qui sont les artisans derrière MAYA ?",
          answer: "MAYA collabore avec un réseau d'artisans qualifiés spécialisés dans l'art du crochet. Notre équipe est composée de créateurs passionnés qui associent techniques traditionnelles et design contemporain. Chaque artisan apporte son expertise unique, ce qui se reflète dans la diversité et l'originalité de nos collections."
        },
        {
          question: "Vos produits sont-ils éthiques et durables ?",
          answer: "Absolument, l'éthique et la durabilité sont au cœur de notre démarche. Nous travaillons exclusivement avec des matériaux écologiques et certifiés. Nos artisans sont rémunérés équitablement et travaillent dans des conditions respectueuses. Nous minimisons notre empreinte environnementale à chaque étape, de la production à l'emballage. Choisir MAYA, c'est soutenir un artisanat responsable et durable."
        },
        {
          question: "Peut-on visiter votre atelier ?",
          answer: "Oui, nous organisons régulièrement des journées portes ouvertes dans notre atelier parisien. C'est l'occasion de rencontrer nos artisans, de découvrir le processus de fabrication et de participer à des ateliers d'initiation au crochet. Les dates sont annoncées sur notre site et nos réseaux sociaux. Pour les groupes, des visites privées peuvent être organisées sur demande."
        },
        {
          question: "Proposez-vous des créations personnalisées ?",
          answer: "Oui, nous réalisons des commandes sur mesure pour des occasions spéciales ou des besoins spécifiques. Que ce soit pour la couleur, la taille, ou même un design entièrement personnalisé, n'hésitez pas à nous contacter pour discuter de votre projet. Notez que les créations personnalisées nécessitent un délai de fabrication plus long et peuvent être soumises à un tarif spécifique."
        },
      ]
    },
  ];

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Foire Aux Questions</h1>
          <p className="text-lg text-muted-foreground mb-12">
            Tout ce que vous devez savoir sur nos produits, commandes et services.
          </p>

          {faqCategories.map((category, index) => (
            <div key={index} className="mb-10">
              <h2 className="text-2xl font-semibold mb-4">{category.title}</h2>
              <Accordion type="single" collapsible className="mb-6">
                {category.questions.map((item, qIndex) => (
                  <AccordionItem key={qIndex} value={`item-${index}-${qIndex}`}>
                    <AccordionTrigger className="text-left font-medium">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}

          <div className="bg-maya-beige rounded-lg p-6 mt-12">
            <h2 className="text-xl font-semibold mb-2">Vous n'avez pas trouvé votre réponse ?</h2>
            <p className="mb-4">
              Notre équipe est à votre disposition pour répondre à toutes vos questions. N'hésitez pas à nous contacter.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild>
                <Link href="/contact">Contactez-nous</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="mailto:contact@maya-bags.com">
                  Envoyer un email
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FaqPage