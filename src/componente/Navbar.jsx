import { useState, useEffect } from "react";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon, HeartIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
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

  const handleGameSelect = (gameId) => {
    const isFavorite = favorites.includes(gameId);
    let updatedFavorites = [...favorites];

    if (isFavorite) {
      updatedFavorites = favorites.filter((id) => id !== gameId);
    } else {
      updatedFavorites.push(gameId);
    }

    setFavorites(updatedFavorites);
  };

  const isGameSelected = (gameId) => {
    return favorites.includes(gameId);
  };

  const filteredGames = games.filter((game) =>
    game.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <>
      <style>{`
        body {
          background-color: #000;
        }
      `}</style>
      <Disclosure as="nav" className="bg-gray-900 shadow mb-8 fixed w-full z-10 top-0">
        {({ open }) => (
          <>
            {/* Navbar content */}
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                {/* Mobile menu button */}
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  <Disclosure.Button
                    className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-orange-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  >
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon
                        className="block h-6 w-6"
                        aria-hidden="true"
                      />
                    ) : (
                      <Bars3Icon
                        className="block h-6 w-6"
                        aria-hidden="true"
                      />
                    )}
                  </Disclosure.Button>
                </div>
                {/* Logo */}
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="h-8 w-auto"
                    src="../images/flask.png"
                    alt="LevelUp"
                  /><span className="text-orange-600 text-xl font">Level-Up</span>
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
                    <div className="relative mr-6 my-2">
                      <input
                        value={searchText}
                        onChange={handleSearchTextChange}
                        type="search"
                        className="text-center bg-purple-white shadow-md rounded border-0 p-0.5 focus:outline-none focus:ring-2 focus:ring-orange-600"
                        placeholder="Search for game"
                        style={{ fontSize: '12px' }}
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
                    className="relative rounded-full bg-orange-800 p-1 text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    {/* Profile image button */}
                    <div>
                      <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src="../images/BelleDelphine.webp"
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
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? "bg-orange-600" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Your Profile
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? "bg-orange-600" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
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
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Sign out
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
      <div className="mt-20 mb-3 bg bg-lime grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols4 gap-6 bg-gray-950">
        {filteredGames.map((game) => (
          <div key={game.id} className="group rounded-lg overflow-hidden relative border border-orange-600 shadow-md hover:shadow-lg">
            <button
              onClick={() => handleGameSelect(game.id)}
              className={classNames(
                "absolute top-0 right-0 m-2 text-gray-400 ",
                isGameSelected(game.id) ? "text-orange-600" : ""
              )}
            >
              <HeartIcon className="h-5 w-5 mr-1" />
              Buy now!
            </button>
            <img
              src={`images/games/${game.image}.webp`}
              alt={game.title}
              className="w-full h-auto rounded-lg group-hover:scale-110 transition-transform duration-300"
            />
            <div className="p-4 bg-gray-800 bg-opacity-20 absolute inset-0 flex flex-col justify-end">
              <h3 className="text-lg font-semibold text-white" style={{ textShadow: '1px 1px 3px #000' }}>{game.title}</h3>
              <h3 className="text-lg font-semibold text-white" style={{ textShadow: '1px 1px 3px #000' }}>{game.price === 0 ? "Free to play" : `${game.price} Euro`}</h3>
              <button
                onClick={() => handleGameSelect(game.id)}
                className={classNames(
                  "absolute top-0 right-0 m-2 text-gray-400 hover:text-orange-600",
                  isGameSelected(game.id) ? "text-orange-600" : ""
                )}
              >
                <HeartIcon className="h-5 w-5 mr-1" />
                Buy now!
              </button>
            </div>
          </div>
        ))}

      </div>

      {/* Total Price */}
      <div className="flex justify-center mb-4 mx-auto border-2 border-orange-600 shadow-lg p-3 rounded-lg">
        <div className="flex flex-col items-center">
          <span className="text-lg font-semibold text-orange-600 mb-2">Total Price: {totalPrice.toFixed(2)} Euro</span>
          <span className="text-sm text-gray-700">Number of games: {favorites.length}</span>
          {/* Listing of cart */}
          <div className="mt-2">
            {favorites.map((gameId) => {
              const selectedGame = games.find((game) => game.id === gameId);
              return (
                <div key={gameId} className="flex justify-between w-full">
                  <span className="text-sm text-gray-300">{selectedGame.title}</span>
                  <span>{selectedGame.price.toFixed(2)} Euro</span>
                </div>
              );
            })}
          </div>
          {/* Checkout */}
          <span className="text-sm text-gray-100 mt-2 flex items-center underline hover:text-orange-600">
            <ShoppingCartIcon className="h-5 w-5 mr-1 text-orange-600" />Checkout
          </span>
        </div>
      </div>
    </>
  );
}