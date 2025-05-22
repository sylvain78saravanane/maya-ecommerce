"use client"

import React, { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, MapPin, Clock } from "lucide-react"

export default function ContactPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Message envoyé",
        description: "Nous vous répondrons dans les plus brefs délais.",
      })
      setName("")
      setEmail("")
      setSubject("")
      setMessage("")
    }, 1500)
  }

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-2">Contactez-nous</h1>
        <p className="text-lg text-muted-foreground mb-12">
          Nous sommes à votre écoute pour toute question ou demande d'information.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Infos de contact */}
          <div className="space-y-6">
            <ContactInfoCard />
            <SocialLinksCard />
          </div>

          {/* Formulaire */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Envoyez-nous un message</CardTitle>
                <CardDescription>Nous vous répondrons dans les plus brefs délais</CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField label="Nom" id="name" value={name} onChange={setName} />
                    <InputField label="Email" id="email" type="email" value={email} onChange={setEmail} />
                  </div>
                  <InputField label="Sujet" id="subject" value={subject} onChange={setSubject} />
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Détaillez votre demande ici..."
                      rows={6}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full md:w-auto" disabled={isSubmitting}>
                    {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

/* === Composants auxiliaires pour clarté === */

function InputField({ label, id, value, onChange, type = "text" }: {
  label: string
  id: string
  value: string
  onChange: (v: string) => void
  type?: string
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
      />
    </div>
  )
}

function ContactInfoCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Comment nous contacter</CardTitle>
        <CardDescription>Nos coordonnées complètes</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <ContactDetail
          icon={<Mail className="h-5 w-5 text-maya-terracotta mt-0.5" />}
          title="Email"
          content={<a href="mailto:contact@maya-bags.com" className="text-muted-foreground hover:text-maya-terracotta">contact@maya-bags.com</a>}
        />
        <ContactDetail
          icon={<Phone className="h-5 w-5 text-maya-terracotta mt-0.5" />}
          title="Téléphone"
          content={
            <>
              <a href="tel:+33123456789" className="text-muted-foreground hover:text-maya-terracotta">+33 1 23 45 67 89</a>
              <p className="text-xs text-muted-foreground">Lun-Ven : 9h-18h | Sam : 10h-16h</p>
            </>
          }
        />
        <ContactDetail
          icon={<MapPin className="h-5 w-5 text-maya-terracotta mt-0.5" />}
          title="Adresse"
          content={<address className="text-muted-foreground not-italic">12 Rue des Artisans<br />75004 Paris<br />France</address>}
        />
        <ContactDetail
          icon={<Clock className="h-5 w-5 text-maya-terracotta mt-0.5" />}
          title="Horaires d'ouverture"
          content={
            <div className="text-muted-foreground">
              <p>Lundi - Vendredi : 9h - 18h</p>
              <p>Samedi : 10h - 16h</p>
              <p>Dimanche : Fermé</p>
            </div>
          }
        />
      </CardContent>
    </Card>
  )
}

function ContactDetail({ icon, title, content }: { icon: React.ReactNode; title: string; content: React.ReactNode }) {
  return (
    <div className="flex items-start space-x-3">
      {icon}
      <div>
        <h3 className="font-medium">{title}</h3>
        {content}
      </div>
    </div>
  )
}

function SocialLinksCard() {
  const socialIcons = [
    {
      href: "https://instagram.com",
      label: "Instagram",
      svg: (
        <>
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </>
      ),
    },
    {
      href: "https://facebook.com",
      label: "Facebook",
      svg: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />,
    },
    {
      href: "https://x.com",
      label: "Pinterest",
      svg: (
        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
      ),
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Suivez-nous</CardTitle>
        <CardDescription>Retrouvez-nous sur les réseaux sociaux</CardDescription>
      </CardHeader>
      <CardContent className="flex space-x-4">
        {socialIcons.map(({ href, label, svg }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-maya-beige rounded-full hover:bg-maya-terracotta transition-colors"
            aria-label={label}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24" height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              {svg}
            </svg>
          </a>
        ))}
      </CardContent>
    </Card>
  )
}
