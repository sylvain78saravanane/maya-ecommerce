import Link from "next/link"
import { Button } from "@/components/ui/button"
import {Card,CardContent,CardDescription,CardHeader,CardTitle} from "@/components/ui/card"
import {Table,TableBody,TableCell,TableHead,TableHeader,TableRow} from "@/components/ui/table"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from "@/components/ui/tabs"
import {
    Truck,
    PackageCheck,
    CheckCircle2
} from "lucide-react"

export const metadata = {
    title: "Livraison et Retours | MAYA",
    description: "Découvrez nos conditions de livraison et notre politique de retours pour les sacs en crochet MAYA.",
}

export default function LivraisonPage() {
    const deliveryTimeData = [
        { region: "France métropolitaine", standard: "2-3 jours ouvrés", express: "24h (commande avant 12h)" },
        { region: "Belgique, Luxembourg, Allemagne", standard: "3-5 jours ouvrés", express: "2-3 jours ouvrés" },
        { region: "Autres pays de l'UE", standard: "4-7 jours ouvrés", express: "2-3 jours ouvrés" },
        { region: "Suisse, Royaume-Uni", standard: "5-7 jours ouvrés", express: "3-4 jours ouvrés" },
        { region: "États-Unis, Canada", standard: "7-10 jours ouvrés", express: "4-6 jours ouvrés" },
        { region: "Reste du monde", standard: "10-15 jours ouvrés", express: "5-9 jours ouvrés" },
    ]

    const shippingCostData = [
        { region: "France métropolitaine", standard: "4,90 €", express: "9,90 €", freeThreshold: "75 €" },
        { region: "Belgique, Luxembourg, Allemagne", standard: "7,90 €", express: "14,90 €", freeThreshold: "100 €" },
        { region: "Autres pays de l'UE", standard: "9,90 €", express: "19,90 €", freeThreshold: "120 €" },
        { region: "Suisse, Royaume-Uni", standard: "12,90 €", express: "24,90 €", freeThreshold: "150 €" },
        { region: "États-Unis, Canada", standard: "19,90 €", express: "34,90 €", freeThreshold: "200 €" },
        { region: "Reste du monde", standard: "29,90 €", express: "49,90 €", freeThreshold: "250 €" },
    ]

    return (
        <div className="pt-24 pb-16">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold mb-2">Livraison et Retours</h1>
                <p className="text-lg text-muted-foreground mb-12">
                    Tout ce que vous devez savoir sur l'expédition, la livraison et les retours de vos commandes MAYA.
                </p>

                <Tabs defaultValue="livraison" className="mb-12">
                    <TabsList className="mb-6">
                        <TabsTrigger value="livraison">Livraison</TabsTrigger>
                        <TabsTrigger value="retours">Retours et Échanges</TabsTrigger>
                    </TabsList>

                    <TabsContent value="livraison">
                        {/* Introduction Livraison */}
                        <div className="space-y-12">
                            <div className="max-w-3xl">
                                <h2 className="text-2xl font-semibold mb-4">Notre politique de livraison</h2>
                                <p className="mb-4">
                                    Chez MAYA, nous nous engageons à vous offrir une expérience de livraison fiable et transparente.
                                    Chaque commande est préparée avec soin dans notre atelier, et expédiée dans un emballage écologique et protecteur.
                                </p>
                                <p>
                                    Vous pouvez suivre votre commande à tout moment grâce au numéro de suivi communiqué par email.
                                </p>
                            </div>

                            {/* Options de livraison */}
                            <div>
                                <h2 className="text-2xl font-semibold mb-6">Options de livraison</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Standard */}
                                    <Card>
                                        <CardHeader className="pb-3">
                                            <div className="flex items-center gap-3 mb-2">
                                                <Truck className="h-6 w-6 text-maya-terracotta" />
                                                <CardTitle>Livraison Standard</CardTitle>
                                            </div>
                                            <CardDescription>Pour les commandes non urgentes</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <ul className="space-y-2">
                                                <li className="flex items-start gap-2">
                                                    <CheckCircle2 className="text-green-500 h-5 w-5 mt-0.5" />
                                                    Livraison rapide selon la destination
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <CheckCircle2 className="text-green-500 h-5 w-5 mt-0.5" />
                                                    Priorité de traitement en atelier
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <CheckCircle2 className="text-green-500 h-5 w-5 mt-0.5" />
                                                    Suivi en temps réel avec notifications
                                                </li>
                                            </ul>
                                        </CardContent>
                                    </Card>

                                    {/* Express */}
                                    <Card>
                                        <CardHeader className="pb-3">
                                            <div className="flex items-center gap-3 mb-2">
                                                <PackageCheck className="h-6 w-6 text-maya-terracotta" />
                                                <CardTitle>Livraison Express</CardTitle>
                                            </div>
                                            <CardDescription>Pour recevoir votre commande rapidement</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <ul className="space-y-2">
                                                <li className="flex items-start gap-2">
                                                    <CheckCircle2 className="text-green-500 h-5 w-5 mt-0.5" />
                                                    Livraison en 24h pour la France (si commandée avant 12h)
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <CheckCircle2 className="text-green-500 h-5 w-5 mt-0.5" />
                                                    Traitement prioritaire
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <CheckCircle2 className="text-green-500 h-5 w-5 mt-0.5" />
                                                    Suivi complet de l’envoi
                                                </li>
                                            </ul>
                                            <p className="mt-4 text-sm text-muted-foreground">
                                                * Livraison express disponible uniquement pour les commandes passées avant 12h00.
                                            </p>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>

                            {/* Tableau des délais */}
                            <div>
                                <h2 className="text-2xl font-semibold mb-4">Délais de livraison</h2>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Région</TableHead>
                                            <TableHead>Standard</TableHead>
                                            <TableHead>Express</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {deliveryTimeData.map((item, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{item.region}</TableCell>
                                                <TableCell>{item.standard}</TableCell>
                                                <TableCell>{item.express}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>

                            {/* Tableau des frais */}
                            <div>
                                <h2 className="text-2xl font-semibold mb-4">Frais de livraison</h2>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Région</TableHead>
                                            <TableHead>Standard</TableHead>
                                            <TableHead>Express</TableHead>
                                            <TableHead>Frais offerts dès</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {shippingCostData.map((item, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{item.region}</TableCell>
                                                <TableCell>{item.standard}</TableCell>
                                                <TableCell>{item.express}</TableCell>
                                                <TableCell>{item.freeThreshold}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="retours">
                        <div className="max-w-3xl space-y-6">
                            <h2 className="text-2xl font-semibold">Politique de retours et échanges</h2>
                            <p>
                                Vous disposez de 14 jours après réception pour retourner ou échanger votre sac MAYA, s’il ne vous convient pas.
                            </p>
                            <p>
                                Le produit doit être retourné dans son état d’origine. Les frais de retour sont à la charge du client sauf en cas d'erreur de notre part.
                            </p>
                            <p>
                                Pour toute demande, contactez notre équipe à <Link href="/contact" className="underline text-maya-terracotta">contact@maya.com</Link>.
                            </p>
                            <Button asChild className="mt-4">
                                <Link href="/contact">Faire une demande de retour</Link>
                            </Button>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
