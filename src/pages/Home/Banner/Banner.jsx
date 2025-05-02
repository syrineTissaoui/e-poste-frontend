import bannerBg from '../../../assets/images/accueil.jpg';

const Banner = () => {
    return (
        <div
            className="bg-cover bg-center h-screen" 
            style={{ backgroundImage: `url(${bannerBg})` }}
        >
            <div className="flex flex-col items-center justify-center h-full text-center text-black px-4  ">
                <h1 className="text-3xl sm:text-5xl lg:text-8xl font-bold leading-tight">
                    Bienvenue sur e-poste
                </h1>
                <p className="mt-4 text-sm sm:text-lg lg:text-xl max-w-3xl">
suivez, envoyez et gérez vos colis et courriers en toute simplicité .
                    <br className="hidden lg:block" /> Une platforme rapide , sécurisée et 100 % tunisienne .
                </p>
                <div className="mt-6 flex flex-col md:flex-row items-center w-full max-w-lg space-y-3 md:space-y-0 md:space-x-3">
                    <input
                        type="text"
                        placeholder="Entez le numero de suivi"
                        className="input input-bordered w-full md:flex-grow py-3 px-4 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <button className="btn btn-primary w-full md:w-auto py-3 px-6 font-semibold rounded-md">
                        Suivre
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Banner;
