import { useState, useEffect } from "react";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon, ShoppingCartIcon, UserIcon, Cog8ToothIcon, ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";
import games from "../data/games.json";

const navigation = [
  { name: "Shop", href: "#", current: false },
  { name: "About", href: "#", current: false },
  { name: "Contact", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const [searchText, setSearchText] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [card, setCard] = useState([]);

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    favorites.forEach((id) => {
      const selectedGame = games.find((game) => game.id === id);

      if (selectedGame) {
        totalPrice += selectedGame.price;
      }
    });
    setTotalPrice(totalPrice);
  };

  useEffect(() => {
    calculateTotalPrice();
  }, [favorites]);

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleGameSelect = (game) => {
    // console.log("Selected game: ", game);
    const isFavorite = favorites.includes(game.id);
    let updatedFavorites = [...favorites];

    if (isFavorite) {
      updatedFavorites = favorites.filter((id) => id !== game.id);
    } else {
      updatedFavorites.push(game.id);
    }

    const existingCartItem = card.find((item) => item.game.id === game.id);
    if (existingCartItem) {
      const updatedCard = card.map((item) => {
        if (item.game.id === game.id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      setCard(updatedCard);
    } else {
      setCard([...card, { id: game.id, game: game, quantity: 1, price: game.price }]);
    }

    setFavorites(updatedFavorites);
  };



  const isGameSelected = (gameId) => {
    return favorites.includes(gameId);
  };

  const filteredGames = games.filter((game) =>
    game.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleUpdateCartItemQuantity = (gameId, amount) => {
    // console.log("Updating cart item quantity for game:", gameId, "with amount:", amount);
    const updatedCard = card.map((item) => {
      if (item.game.id === gameId) {
        // console.log("Found matching item in cart:", item);
        const selectedGame = games.find((game) => game.id === item.game.id);
        const newQuantity = item.quantity + amount;
        const nonNegativeQuantity = Math.max(newQuantity, 0);
        const newPrice = nonNegativeQuantity * selectedGame.price;
        // console.log("New quantity:", nonNegativeQuantity, "New price:", newPrice);
        return { ...item, quantity: nonNegativeQuantity, price: newPrice, title: selectedGame.title };
      }
      return item;
    });

    // console.log("Updated cart:", updatedCard);
    setCard(updatedCard);
  };

  const handleClearCart = () => {
    setCard([]);
    setFavorites([]);
  };

  return (
    <>
      <style>{`
        body {
          background-color: #000;
        }
      `}</style>
      <Disclosure
        as="nav"
        className="bg-gray-900 shadow mb-8 fixed w-full z-10 top-0"
      >
        {({ open }) => (
          <>
            {/* Navbar content */}
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                {/* Mobile menu button */}
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 bg-orange-600 text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                {/* Logo */}
                <div className="flex flex-shrink-0 items-center justify-start ms-10 w-full sm:w-auto">
                  <img
                    className="h-8 w-auto"
                    src="../images/flask.png"
                    alt="LevelUp"
                  /><span className="text-orange-600 text-xl font hidden">Level-Up</span>
                </div>
                {/* Navbar links */}
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4 items-center font">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-orange-600 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                    {/* Search input */}
                    <div className="relative flex justify-center w-full">
                      <input
                        value={searchText}
                        onChange={handleSearchTextChange}
                        type="search"
                        className="text-center shadow-md rounded p-0.5 border-2 border-orange-800 focus:outline-none focus:ring-2 focus:ring-orange-600"
                        placeholder="search"
                        style={{ fontSize: '13px' }}
                      />
                      <div className="absolute pin-r pin-t text-purple-lighter"></div>
                    </div>
                  </div>
                </div>
                {/* Notification Bell and Profile dropdown */}
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {/* Notification Bell */}
                  <button
                    type="button"
                    className="relative rounded-full bg-orange-800 p-1 text-white border-2 border-orange-800 hover:text-white hover:border-white"
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    {/* Profile image button */}
                    <div>
                      <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm border-2 border-gray-900 hover:border-white">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-9 w-9 rounded-full"
                          src="../images/avatar.jpg"
                          alt=""
                        />
                      </Menu.Button>
                    </div>
                    {/* Profile dropdown items */}
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-gray-900 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? "bg-orange-600" : "",
                                "flex justify-between px-4 py-2 text-lg text-white border-b border-gray-800"
                              )}
                            ><UserIcon class="h-6 w-6 text-white" />
                              Dashbord
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? "bg-orange-600" : "",
                                "flex justify-between px-4 py-2 text-lg text-white border-b border-gray-800"
                              )}
                            ><Cog8ToothIcon class="h-6 w-6 text-white" />
                              Settings
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? "bg-orange-600" : "",
                                "flex justify-between px-4 py-2 text-lg text-white"
                              )}
                            ><ArrowRightStartOnRectangleIcon class="h-6 w-6 text-white" />
                              Logout
                            </a>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>
            {/* Mobile menu */}
            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block rounded-md px-3 py-2 text-base font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      {/* Render filtered games */}
      <div className="mt-20 mb-3 bg bg-lime grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols4 gap-6">
        {filteredGames.map((game) => (
          <div
            key={game.id}
            className="group rounded-lg overflow-hidden relative border border-2 border-orange-600 shadow-md hover:shadow-lg"
          >
            <img
              src={`images/games/${game.image}.webp`}
              alt={game.title}
              className="w-full h-auto rounded-lg group-hover:scale-110 transition-transform duration-300"
            />
            <div className="p-4 bg-gray-800 bg-opacity-20 absolute inset-0 flex flex-col justify-end">
              <h3
                className="text-lg font-semibold text-white"
                style={{ textShadow: "1px 1px 3px #000" }}
              >
                {game.title}
              </h3>
              <h3
                className="text-lg font-semibold text-white"
                style={{ textShadow: "1px 1px 3px #000" }}
              >
                {game.price === 0 ? "Free to play" : `${game.price} Euro`}
              </h3>
              <button
                onClick={() => handleGameSelect(game)}
                className={classNames(
                  "flex absolute top-0 right-0 m-4 text-gray-400 hover:border-orange-600 text-lg text-white border-2 border-gray-400 p-2 bg-gray-900/50 rounded-lg",
                  isGameSelected(game.id) ? "bg-green-700" : "bg-gray-900/50"
                )}
              >
                <ShoppingCartIcon className="h-7 w-5 mr-3 text-orange-600" />
                Buy now!
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Total Price */}
      <div className="fixed bottom-0 w-full bg-gray-900 flex justify-center mx-auto border-2 border-orange-600 shadow-lg p-3 rounded-lg">
        <div className="flex flex-col items-center">
          <span className="text-sm text-gray-300">
            Number of games: {favorites.length}
          </span>
          {/* Listing of cart */}
          <div className="mt-2">
            {favorites.map((gameId) => {
              const selectedGame = games.find((game) => game.id === gameId);
              return (
                <div key={gameId} className="flex justify-between w-full">
                  <span className="text-sm text-gray-200">
                    {selectedGame.title}
                  </span>
                </div>
              );
            })}
          </div>
          <span className="text-lg font-semibold text-orange-600 mb-2 overline">
            Total Price: {totalPrice.toFixed(2)} Euro
          </span>
          {/* Checkout */}
          <span
            className="text-sm text-gray-100 mt-2 flex items-center hover:underline"
            onClick={() => document.getElementById("my_modal_5").showModal()}
          >
            <ShoppingCartIcon className="h-5 w-5 mr-1 text-orange-600" />
            Checkout
          </span>
        </div>
        {/* Modal */}
        {/* Open the modal using document.getElementById('ID').showModal() method */}
        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box bg-gray-900 shadow-lg rounded-lg p-4 border-2 border-orange-600">
            <div className="mt-2">
              {card.length > 0
                ? card.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center w-full py-1 border-b border-gray-700"
                  >
                    <span className="text-sm text-white">{item.game.title}</span>
                    <div className="flex-grow"></div> {/* Platzhalter, um den Raum zwischen title und price zu füllen */}
                    <span className="text-sm text-white mr-3">{item.price.toFixed(2)} Euro</span>
                    <div className="flex gap-2 items-center">
                      <button
                        className="btn btn-sm bg-orange-600 text-white text-lg font-bold hover:bg-red-600"
                        onClick={() =>
                          handleUpdateCartItemQuantity(item.id, -1)
                        }
                      >
                        -
                      </button>
                      <span className="text-sm text-white">
                        {item.quantity}
                      </span>
                      <button
                        className="btn btn-sm text-white bg-orange-600 text-lg font-bold hover:bg-green-600"
                        onClick={() =>
                          handleUpdateCartItemQuantity(item.id, 1)
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                )) :
                < div className="flex justify-center items-center text-white">
                  Cart is empty
                </div>
              }
            </div>
            <div className="modal-action mt-4 flex justify-end">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <h3 className="font-bold text-lg text-orange-600 text-right">
                  {card.reduce((acc, curr) => acc + curr.price, 0).toFixed(2)}{" "}
                  Euro
                </h3>
                <button className="btn bg-orange-500 hover:bg-red-600 text-white px-4 py-2 rounded focus:outline-none focus:shadow-outline">
                  Close
                </button>
                {/* Button zum Löschen aller Spiele */}
                <button
                  className="btn bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded focus:outline-none focus:shadow-outline ml-2"
                  onClick={() => handleClearCart()} // handleClearCart ist eine Funktion, die den Warenkorb leert
                >
                  Delete
                </button>
                {/* Button für "Jetzt bezahlen" mit Link */}
                <a
                  href="https://www.klarna.com/sofort/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn bg-orange-600 hover:bg-green-600 text-white px-4 py-2 rounded ml-2 focus:outline-none focus:shadow-outline"
                >
                  Pay now
                </a>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </>
  );
}