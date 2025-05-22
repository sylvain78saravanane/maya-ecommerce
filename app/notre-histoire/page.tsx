import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Comment sont fabriqués nos produits | MAYA",
  description:
    "Découvrez le processus de fabrication artisanal de nos produits en crochet, de la sélection des matériaux à la finition.",
}

export default function FabricationPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <section className="mb-16">
          <div className="relative h-[400px] md:h-[500px] w-full rounded-lg overflow-hidden">
            <Image
              src="/placeholder.svg?height=1000&width=2000"
              alt="Artisanat MAYA"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="text-center text-white max-w-3xl px-4">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Comment sont fabriqués nos produits qui sont</h1>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  <span className="text-blue-800">MADE</span>{' '}
                  <span className="text-white">IN</span>{' '}
                  <span className="text-red-800">FRANCE</span>
                </h1>
                <p className="text-lg">Découvrez le savoir-faire artisanal derrière chaque création MAYA</p>
              </div>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="mb-16 max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Notre philosophie</h2>
          <p className="text-lg mb-4">
            Chez MAYA, nous croyons en l&apos;artisanat authentique et durable. Chaque sac est une œuvre d&apos;art
            unique, créée avec passion et respect pour les traditions.
          </p>
          <p className="text-lg">
            Notre mission est de préserver les techniques ancestrales du crochet tout en les réinventant pour créer des
            accessoires contemporains qui racontent une histoire.
          </p>
        </section>

        {/* Process Steps */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-10 text-center">Notre processus de fabrication</h2>

          {/* Step 1 */}
          <div className="flex flex-col md:flex-row items-center mb-16">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <div className="relative aspect-square rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=800&width=800"
                  alt="Sélection des matériaux"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="md:w-1/2">
              <h3 className="text-2xl font-bold mb-4">1. Sélection des matériaux</h3>
              <p className="mb-4">
                Nous sélectionnons avec soin des fils de coton biologique et des matériaux durables pour nos créations.
                Chaque fil est choisi pour sa qualité, sa texture et sa couleur.
              </p>
              <p>
                Nos matériaux proviennent de fournisseurs locaux qui partagent nos valeurs d&apos;éthique et de
                durabilité, garantissant ainsi un produit respectueux de l&apos;environnement.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col md:flex-row-reverse items-center mb-16">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pl-8">
              <div className="relative aspect-square rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=800&width=800"
                  alt="Design et création de motifs"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="md:w-1/2">
              <h3 className="text-2xl font-bold mb-4">2. Design et création de motifs</h3>
              <p className="mb-4">
                Nos designers créent des motifs uniques qui allient tradition et modernité. Chaque modèle est
                d&apos;abord esquissé à la main, puis transformé en diagramme de crochet.
              </p>
              <p>
                Nous expérimentons constamment de nouvelles techniques et motifs pour offrir des pièces originales qui
                se démarquent par leur esthétique et leur fonctionnalité.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col md:flex-row items-center mb-16">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <div className="relative aspect-square rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=800&width=800"
                  alt="Fabrication au crochet"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="md:w-1/2">
              <h3 className="text-2xl font-bold mb-4">3. Fabrication au crochet</h3>
              <p className="mb-4">
                Chaque sac est crocheté à la main par nos artisans qualifiés. Ce processus minutieux peut prendre
                plusieurs jours selon la complexité du modèle.
              </p>
              <p>
                Le crochet est un art qui demande patience et précision. Nos artisans maîtrisent différentes techniques
                pour créer des textures variées et des structures solides.
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex flex-col md:flex-row-reverse items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pl-8">
              <div className="relative aspect-square rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=800&width=800"
                  alt="Finitions et contrôle qualité"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="md:w-1/2">
              <h3 className="text-2xl font-bold mb-4">4. Finitions et contrôle qualité</h3>
              <p className="mb-4">
                Une fois le crochet terminé, nous ajoutons soigneusement les finitions : doublures, fermetures, anses et
                détails décoratifs qui complètent le design.
              </p>
              <p>
                Chaque sac passe par un contrôle qualité rigoureux pour s&apos;assurer qu&apos;il répond à nos standards
                élevés avant d&apos;être proposé à la vente.
              </p>
            </div>
          </div>
        </section>

        {/* Artisans Section */}
        <section className="mb-16 bg-maya-beige py-16 px-4 rounded-lg">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Nos artisans</h2>
            <p className="text-lg mb-8">
              Derrière chaque création MAYA se trouve le talent et la passion de nos artisans. Formés aux techniques
              traditionnelles du crochet, ils apportent leur expertise et leur créativité à chaque pièce.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="text-center">
                  <div className="relative h-40 w-40 mx-auto rounded-full overflow-hidden mb-4">
                    <Image
                      src={`/placeholder.svg?height=200&width=200`}
                      alt={`Artisan ${i}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="font-medium">Artisan {i}</h3>
                  <p className="text-sm text-muted-foreground">
                    {i === 1
                      ? "Spécialiste du crochet depuis 15 ans"
                      : i === 2
                        ? "Maître des motifs complexes"
                        : "Expert en finitions"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Découvrez nos créations</h2>
          <p className="text-lg mb-8">
            Maintenant que vous connaissez le processus de fabrication de nos sacs, explorez notre collection et trouvez
            la pièce qui vous correspond.
          </p>
          <Button asChild size="lg">
            <Link href="/boutique">Voir la collection</Link>
          </Button>
        </section>
      </div>
    </div>
  )
}
