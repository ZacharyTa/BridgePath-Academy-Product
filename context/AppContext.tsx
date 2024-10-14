"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { parseCookies } from "nookies"; // Import nookies for cookie management
import { User } from "@supabase/supabase-js";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"; // Import Supabase client

// Define the type of the context value
interface AppContextType {
  currentView: string;
  setCurrentView: React.Dispatch<React.SetStateAction<string>>;
  userId: string | null;
  user: User | null;
}

// Create a context with the defined type
const AppContext = createContext<AppContextType | undefined>(undefined);

// Create a provider component
export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  // State to manage the current view
  const [currentView, setCurrentView] = useState<string>("home");

  // Read the user ID from the cookie set by the middleware
  const [userId, setUserId] = useState<string | null>();

  // State to manage the User object from Supabase
  const [user, setUser] = useState<User | null>(null);

  // State to manage whether the code is running on the client side
  const [isClient, setIsClient] = useState<boolean>(false);

  // Initialize Supabase client
  const supabase = createClientComponentClient();

  // Effect to set isClient to true and get the initial view from local storage
  useEffect(() => {
    setIsClient(true);
    if (typeof window !== "undefined") {
      const initialView = localStorage.getItem("currentView") || "home";
      setCurrentView(initialView);
    }
  }, []);

  // Effect to update the current view in local storage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("currentView", currentView);
    }
  }, [currentView]);

  // Effect to listen for cookie changes and update userId accordingly
  // Effect to initialize the userId based on the Supabase auth cookie
  useEffect(() => {
    // Parse the existing cookies
    const cookies = parseCookies();

    console.log("Cookies:", cookies);

    // Extract the Supabase auth token cookie (the key may differ based on your Supabase project)
    const supabaseAuthToken = cookies["sdsds"]; // Replace with your project's actual cookie name

    if (supabaseAuthToken) {
      try {
        // Parse the auth token to extract the user ID
        const authData = JSON.parse(supabaseAuthToken);
        const userId = authData?.user?.id || null;

        if (userId) {
          setUserId(userId);
          console.log("User ID set in AppContext:", userId);
        } else {
          console.log("User ID not found in Supabase auth cookie.");
        }
      } catch (error) {
        console.error("Error parsing Supabase auth cookie:", error);
      }
    } else {
      console.log("Supabase auth cookie not found.");
    }
  }, []); // Run only on mount

  // Effect to get the user data from Supabase
  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user data:", error);
      } else {
        setUser(user);
        console.log("User data set in AppContext:", user);
      }
    };
    getUser();
  }, [supabase]);

  // Return the provider with the current view and a function to update it
  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        userId,
        user,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Create a custom hook to use the AppContext
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
