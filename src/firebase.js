const { initializeApp } = require("firebase/app");
const { getFirestore, collection, getDocs } = require("firebase/firestore");
const emailjs = require("@emailjs/nodejs");

const firebaseConfig = {
  // Twoja konfiguracja Firebase
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function sendNews() {
  const subscribersSnapshot = await getDocs(collection(db, "subscribers"));
  const subscribers = subscribersSnapshot.docs.map((doc) => doc.data().email);

  const serviceID = "YOUR_SERVICE_ID";
  const templateID = "YOUR_NEWS_TEMPLATE_ID"; // Nowy szablon w EmailJS
  const publicKey = "YOUR_PUBLIC_KEY";

  for (const email of subscribers) {
    const templateParams = {
      to_email: email,
      message: "Tu wpisz treść aktualności!", // Twoja wiadomość
    };

    await emailjs.send(serviceID, templateID, templateParams, publicKey);
    console.log(`Wysłano do: ${email}`);
  }
}

sendNews().catch(console.error);
