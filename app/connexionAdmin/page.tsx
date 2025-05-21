// app/connexionAdmin/page.tsx
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Lock, AtSign, KeyRound } from "lucide-react"

export default function AdminLoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [adminCode, setAdminCode] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const router = useRouter()
    const { loginAdmin } = useAuth()
    const { toast } = useToast()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            // Validate form
            if (!email || !password || !adminCode) {
                toast({
                    title: "Erreur de validation",
                    description: "Tous les champs sont obligatoires",
                    variant: "destructive",
                })
                setIsLoading(false)
                return
            }

            // Call admin login API
            await loginAdmin(email, password, adminCode)
            
            toast({
                title: "Connexion réussie",
                description: "Bienvenue dans l'interface d'administration",
            })
            
            router.push("/admin")
        } catch (error) {
            console.error("Login error:", error)
            toast({
                title: "Erreur de connexion",
                description: "Email, mot de passe ou code admin incorrect",
                variant: "destructive",
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-muted/30">
            <div className="w-full max-w-md px-4">
                <div className="flex flex-col items-center justify-center mb-8" style={{ marginTop: "5rem" }}>
                    <h1 className="text-3xl font-bold">Administration MAYA</h1>
                    <p className="text-muted-foreground mt-2">Connexion à l'interface d'administration</p>
                </div>
                
                <Card>
                    <CardHeader>
                        <CardTitle>Connexion Administrateur</CardTitle>
                        <CardDescription>
                            Accédez à l'interface de gestion du site
                        </CardDescription>
                    </CardHeader>
                    <form onSubmit={handleLogin}>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <div className="relative">
                                    <AtSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="admin@maya-bags.com"
                                        className="pl-10"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            
                            <div className="space-y-2">
                                <Label htmlFor="password">Mot de passe</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="••••••••"
                                        className="pl-10"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            
                            <div className="space-y-2">
                                <Label htmlFor="adminCode">Code Administrateur</Label>
                                <div className="relative">
                                    <KeyRound className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="adminCode"
                                        type="text"
                                        placeholder="Code secret"
                                        className="pl-10"
                                        value={adminCode}
                                        onChange={(e) => setAdminCode(e.target.value)}
                                        required
                                    />
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Code fourni uniquement aux administrateurs autorisés
                                </p>
                            </div>
                        </CardContent>
                        
                        <CardFooter className="flex flex-col">
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? "Connexion en cours..." : "Se connecter"}
                            </Button>
                            
                            <div className="mt-6 text-center">
                                <Link href="/" className="text-sm text-muted-foreground hover:text-accent">
                                    Retour au site
                                </Link>
                            </div>
                        </CardFooter>
                    </form>
                </Card>
                
                <div className="text-center mt-8 text-sm text-muted-foreground">
                    <p>© {new Date().getFullYear()} MAYA. Tous droits réservés.</p>
                    <p className="mt-1">Accès réservé aux administrateurs</p>
                </div>
            </div>
        </div>
    )
}