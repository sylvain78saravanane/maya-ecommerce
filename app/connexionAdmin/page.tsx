"use client"

// TODO : Créer la page de connexion Admin

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

export default function LoginAdminPage() {
    const [loginAdminEmail, setAdminEmail] = useState("")
    const [loginAdminPassword, setAdminPassword] = useState("")
    const [codeAdmin, setCodeAdmin] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const { loginAdmin, registrerAdmin } = useAuth()
    const router = useRouter()
    const { toast } = useToast()

    const handleLoginAdmin = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            await loginAdmin(loginAdminEmail, loginAdminPassword)
            toast({
                title: "Connexion réussie",
                description: "Vous êtes maintenant connecté à votre compte admin.",
            })
            router.push("/admin")
        } catch (error) {
            toast({
                title: "Erreur de connexion",
                description: "Email ou mot de passe incorrect.",
                variant: "destructive",
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Connexion Administrateur</CardTitle>
                    <CardDescription>
                        Connectez-vous à votre compte admin pour gérer le site.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="login" className="w-full">
                        <TabsContent value="login">
                            <form onSubmit={handleLoginAdmin} className="space-y-4">
                                <div>
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={loginAdminEmail}
                                        onChange={(e) => setAdminEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="password">Mot de passe</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        value={loginAdminPassword}
                                        onChange={(e) => setAdminPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="code">Code Admin</Label>
                                    <Input
                                        id="code"
                                        type="text"
                                        value={codeAdmin}
                                        onChange={(e) => setCodeAdmin(e.target.value)}
                                        required
                                    />
                                </div>
                                <Button type="submit" disabled={isLoading}>
                                    {isLoading ? "Chargement..." : "Se connecter"}
                                </Button>
                            </form>
                        </TabsContent>

                        {/* Register Tab */}
                        <TabsContent value="register">
                            {/* Registration form can be added here */}
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    )
}