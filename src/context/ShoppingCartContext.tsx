import { ReactNode, createContext, useContext, useState } from "react";
import { MangaModelData } from "../interfaces/MangaModelInterface";
import { useLocalStorage } from "../hooks/useLocalStorage";

type ShoppingProviderProps = {
    children: ReactNode;
  };

export type ItemsInCartClient = {
  id: number;
  quantity: number;
  manga?: MangaModelData;
};

type ShoppingCartContext = {
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  removeFormCart: (id: number) => void;
  cartQuantity: number;
  ItemsInCartClient: ItemsInCartClient[];
  populateManga: (mangas: MangaModelData[]) => void;
};

const ShoppingCarContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
  return useContext(ShoppingCarContext);
}

export function ShoppingCartProvider({ children }: ShoppingProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [ItemsCartClient, setItemsCartClient] = useLocalStorage<
    ItemsInCartClient[]
  >("shoppingCart", []);
  const cartQuantity = ItemsCartClient.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  function getItemQuantity(id: number) {
    return ItemsCartClient.find((item) => item.id === id)?.quantity || 0;
  }

  function increaseCartQuantity(id: number) {
    setItemsCartClient((currentItem) => {
      if (currentItem.find((item) => item.id === id) == null) {
        return [...currentItem, { id, quantity: 1 }];
      } else {
        return currentItem.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function decreaseCartQuantity(id: number) {
    setItemsCartClient((currentItem) => {
      if (currentItem.find((item) => item.id === id)?.quantity == 1) {
        return currentItem.filter((item) => item.id !== id);
      } else {
        return currentItem.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function removeFormCart(id: number) {
    setItemsCartClient((currentItem) => {
      return currentItem.filter((item) => item.id !== id);
    });
  }

  function populateManga(mangas: MangaModelData[]) {
    setItemsCartClient((currentItems) => {
      return currentItems.map((item) => {
        return {
          ...item,
          manga: mangas.find((manga) => manga.mal_id === item.id),
        };
      });
    });
  }

  return (
    <ShoppingCarContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFormCart,
        openCart,
        closeCart,
        ItemsInCartClient: ItemsCartClient,
        cartQuantity,
        populateManga,
      }}
    >
      {children}
    </ShoppingCarContext.Provider>
  );
}

