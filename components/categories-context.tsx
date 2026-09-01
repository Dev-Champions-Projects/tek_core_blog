// "use client";

// import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
// import { CategoryProps } from "@/hooks/use-categories";

// interface CategoriesContextType {
//   categories: CategoryProps[];
//   loading: boolean;
// }

// const CategoriesContext = createContext<CategoriesContextType>({
//   categories: [],
//   loading: true,
// });

// export const useCategoriesContext = () => useContext(CategoriesContext);

// export function CategoriesProvider({ children }: { children: ReactNode }) {
//   const [categories, setCategories] = useState<CategoryProps[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchCategories() {
//       try {
//         const res = await fetch("/api/categories");
//         const data = await res.json();
//         setCategories(data);
//       } catch (e) {
//         setCategories([]);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchCategories();
//   }, []);

//   return (
//     <CategoriesContext.Provider value={{ categories, loading }}>
//       {children}
//     </CategoriesContext.Provider>
//   );
// }

"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

import { CategoryProps } from "@/hooks/use-categories";

interface CategoriesContextType {
  categories: CategoryProps[];
  setCategories: React.Dispatch<React.SetStateAction<CategoryProps[]>>;
  loading: boolean;
}

const CategoriesContext = createContext<CategoriesContextType>({
  categories: [],
  setCategories: () => {},
  loading: false,
});

export const useCategoriesContext = () => useContext(CategoriesContext);

interface CategoriesProviderProps {
  children: ReactNode;
  initialCategories?: CategoryProps[];
}

export function CategoriesProvider({
  children,
  initialCategories = [],
}: CategoriesProviderProps) {
  const [categories, setCategories] =
    useState<CategoryProps[]>(initialCategories);

  return (
    <CategoriesContext.Provider
      value={{
        categories,
        setCategories,
        loading: false,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
}
