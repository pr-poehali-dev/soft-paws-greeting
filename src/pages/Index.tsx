import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/hooks/use-toast";
import Icon from "@/components/ui/icon";

interface Appointment {
  id: string;
  petName: string;
  petType: string;
  ownerName: string;
  phone: string;
  date: Date;
  time: string;
  reason: string;
}

const Index = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleBooking = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const newAppointment: Appointment = {
      id: Date.now().toString(),
      petName: formData.get("petName") as string,
      petType: formData.get("petType") as string,
      ownerName: formData.get("ownerName") as string,
      phone: formData.get("phone") as string,
      date: selectedDate || new Date(),
      time: formData.get("time") as string,
      reason: formData.get("reason") as string,
    };

    setAppointments([...appointments, newAppointment]);
    setIsDialogOpen(false);
    
    toast({
      title: "Запись успешно создана! 🎉",
      description: `Ждём вас ${selectedDate?.toLocaleDateString("ru-RU")} в ${newAppointment.time}`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-accent/30 to-background">
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 animate-fade-in">
              <div className="text-5xl">🐾</div>
              <div>
                <h1 className="text-2xl font-bold text-primary">Мягкие лапки</h1>
                <p className="text-sm text-muted-foreground">Ветеринарная клиника</p>
              </div>
            </div>
            
            <nav className="hidden md:flex gap-2">
              <Button variant="ghost" className="gap-2">
                <Icon name="Calendar" size={18} />
                Мои записи
              </Button>
              <Button variant="ghost" className="gap-2">
                <Icon name="Phone" size={18} />
                Контакты
              </Button>
              <Button variant="ghost" className="gap-2">
                <Icon name="User" size={18} />
                Профиль
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Забота о ваших питомцах — наша миссия
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Профессиональная ветеринарная помощь с заботой и любовью. 
            Мы всегда рядом, когда это нужно вашему пушистому другу.
          </p>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="gap-2 text-lg px-8 py-6 animate-scale-in shadow-lg hover:shadow-xl transition-all">
                <Icon name="CalendarPlus" size={24} />
                Записаться на приём
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl">Запись на приём</DialogTitle>
                <DialogDescription>
                  Заполните форму, и мы свяжемся с вами для подтверждения
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handleBooking} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="petName">Кличка питомца</Label>
                    <Input id="petName" name="petName" placeholder="Барсик" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="petType">Вид животного</Label>
                    <Input id="petType" name="petType" placeholder="Кот, собака..." required />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="ownerName">Ваше имя</Label>
                    <Input id="ownerName" name="ownerName" placeholder="Иван Петров" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Телефон</Label>
                    <Input id="phone" name="phone" type="tel" placeholder="+7 (999) 123-45-67" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Выберите дату</Label>
                  <div className="flex justify-center">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="rounded-md border"
                      disabled={(date) => date < new Date()}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time">Удобное время</Label>
                  <Input id="time" name="time" type="time" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reason">Причина обращения</Label>
                  <Input id="reason" name="reason" placeholder="Плановый осмотр, вакцинация..." required />
                </div>

                <Button type="submit" className="w-full" size="lg">
                  Подтвердить запись
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </section>

        <section className="mb-16">
          <Tabs defaultValue="appointments" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
              <TabsTrigger value="appointments">Мои записи</TabsTrigger>
              <TabsTrigger value="contacts">Контакты</TabsTrigger>
              <TabsTrigger value="profile">Профиль</TabsTrigger>
            </TabsList>

            <TabsContent value="appointments" className="mt-8">
              <div className="max-w-4xl mx-auto">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Icon name="ClipboardList" size={28} />
                  Ваши записи
                </h3>
                
                {appointments.length === 0 ? (
                  <Card className="text-center py-12">
                    <CardContent>
                      <div className="text-6xl mb-4">📋</div>
                      <p className="text-muted-foreground">У вас пока нет записей</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Нажмите кнопку "Записаться на приём" чтобы создать первую запись
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid gap-4">
                    {appointments.map((apt) => (
                      <Card key={apt.id} className="animate-scale-in hover:shadow-md transition-shadow">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <span>🐾</span>
                            {apt.petName} ({apt.petType})
                          </CardTitle>
                          <CardDescription>{apt.reason}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="grid md:grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center gap-2">
                              <Icon name="User" size={16} className="text-muted-foreground" />
                              <span>{apt.ownerName}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Icon name="Phone" size={16} className="text-muted-foreground" />
                              <span>{apt.phone}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Icon name="Calendar" size={16} className="text-muted-foreground" />
                              <span>{apt.date.toLocaleDateString("ru-RU")}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Icon name="Clock" size={16} className="text-muted-foreground" />
                              <span>{apt.time}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="contacts" className="mt-8">
              <div className="max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Icon name="MapPin" size={28} />
                  Контакты
                </h3>
                
                <Card>
                  <CardContent className="pt-6 space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-3 rounded-full">
                        <Icon name="Phone" size={24} className="text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold mb-1">Телефон</p>
                        <p className="text-muted-foreground">+7 (999) 123-45-67</p>
                        <p className="text-sm text-muted-foreground">Ежедневно с 8:00 до 22:00</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-secondary/50 p-3 rounded-full">
                        <Icon name="MapPin" size={24} className="text-secondary-foreground" />
                      </div>
                      <div>
                        <p className="font-semibold mb-1">Адрес</p>
                        <p className="text-muted-foreground">г. Москва, ул. Ветеринарная, д. 15</p>
                        <p className="text-sm text-muted-foreground">м. Парк культуры</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-muted p-3 rounded-full">
                        <Icon name="Mail" size={24} className="text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-semibold mb-1">Email</p>
                        <p className="text-muted-foreground">info@myagkie-lapki.ru</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="profile" className="mt-8">
              <div className="max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Icon name="User" size={28} />
                  Личный кабинет
                </h3>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center py-8">
                      <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon name="User" size={48} className="text-primary" />
                      </div>
                      <p className="text-muted-foreground">
                        Авторизуйтесь для доступа к личному кабинету
                      </p>
                      <Button className="mt-4" variant="outline">
                        Войти
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </section>

        <section className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="text-4xl mb-2">⏰</div>
              <CardTitle>Круглосуточно</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Экстренная помощь доступна 24/7
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="text-4xl mb-2">👨‍⚕️</div>
              <CardTitle>Опытные врачи</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Профессионалы с опытом более 10 лет
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="text-4xl mb-2">💊</div>
              <CardTitle>Полный спектр услуг</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                От профилактики до сложных операций
              </p>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t mt-16 py-8 bg-white/50">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p className="mb-2">© 2024 Ветеринарная клиника "Мягкие лапки"</p>
          <p className="text-sm">С любовью к вашим питомцам 🐾</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
