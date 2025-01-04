import Footer from "../features/Footer";
import Header from "../features/Header";

const About = () => {
  return (
    <div className="h-screen text-orange-500">
      <Header />
      <img
        src="../../public/night_theatre.jpg"
        alt="night_theatre"
        className="object-cover w-screen brightness-50 h-4/5"
      />

      <main className="pt-5 px-14 bg-purple-950">
        <section className="pb-8">
          <h1 className="py-3 text-2xl font-bold">
            Let's find your favorite movies!
          </h1>
          <p>
            MOVIE PICKER helps you with providing a variety of movies. If you
            are looking for old movies, new movies, or upcoming movies, you can
            find. MOVIE PICKER would give you a hand to find out from key
            keywords by search bar. Enjoy your time with MOVIE PICKER!
          </p>
        </section>

        <section className="pb-8">
          <h1 className="py-3 text-2xl font-bold">Detail information</h1>
          <p>
            When clicked a movie card, you could get more detail information
            such as the overview, genres, actors, other reviews, etc. Note that
            keywords should be more than 4 words.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
