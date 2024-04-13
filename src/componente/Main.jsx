import { Carousel } from "@material-tailwind/react";

export default function Main() {
  return (
    <Carousel
      style={{
        height: "93.4vh",
        backgroundColor: '#ea580c',
      }}
      loop={true} // Aktiviere die Endlosschleife
      responsive={{
        // Passe die Anzahl der Slides pro Ansicht basierend auf der Bildschirmgröße an
        "640": {
          slidesPerView: 1, // Bei Bildschirmen mit einer Breite von weniger als 640px nur eine Slide anzeigen
        },
        "768": {
          slidesPerView: 2, // Bei Bildschirmen mit einer Breite von weniger als 768px zwei Slides anzeigen
        },
        "1024": {
          slidesPerView: 3, // Bei Bildschirmen mit einer Breite von weniger als 1024px drei Slides anzeigen
        },
      }}
    >
      <img style={{ marginTop: '270px' }}
        src="https://gaming-cdn.com/images/products/9575/616x353/helldivers-2-pc-game-steam-europe-cover.jpg"
        alt="image 1"
        className="w-600 object-cover mx-auto rounded-lg"
      />
      <img style={{ marginTop: '270px' }}
        src="https://gaming-cdn.com/images/products/15086/616x353/horizon-forbidden-west-complete-edition-complete-edition-pc-game-steam-europe-cover.jpg"
        alt="image 2"
        className="w-600 object-cover mx-auto rounded-lg"
      />
      <img style={{ marginTop: '270px' }}
        src="https://gaming-cdn.com/images/products/442/616x353/minecraft-java-and-bedrock-edition-pc-game-cover.jpg"
        alt="image 3"
        className="w-600 object-cover mx-auto rounded-lg"
      />
    </Carousel>
  );
}
