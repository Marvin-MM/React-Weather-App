import { useState, useEffect } from "react";
import type { Coordinates } from "@/api/types";

interface GeolocationState {
  coordinates: Coordinates | null;
  error: string | null;
  isLoading: boolean;
}

export function useGeolocation() {
  const [locationData, setLocationData] = useState<GeolocationState>({
    coordinates: null,
    error: null,
    isLoading: true,
  });

  const getLocation = async () => {
    setLocationData((prev) => ({ ...prev, isLoading: true, error: null }));

    if (!navigator.geolocation) {
      setLocationData({
        coordinates: null,
        error: "Geolocation is not supported by your browser",
        isLoading: false,
      });
      return;
    }

    try {
      // **Check permission first**
      const permissionStatus = await navigator.permissions.query({ name: "geolocation" });

      if (permissionStatus.state === "denied") {
        setLocationData({
          coordinates: null,
          error: "Location permission denied. Enable location in browser settings.",
          isLoading: false,
        });
        return;
      }

      // **Request location**
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocationData({
            coordinates: {
              lat: position.coords.latitude,
              lon: position.coords.longitude,
            },
            error: null,
            isLoading: false,
          });
        },
        (error) => {
          let errorMessage: string;
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = "Location permission denied. Please allow location access.";
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = "Location unavailable. Trying lower accuracy mode...";
              // Retry with lower accuracy
              navigator.geolocation.getCurrentPosition(
                (pos) => {
                  setLocationData({
                    coordinates: {
                      lat: pos.coords.latitude,
                      lon: pos.coords.longitude,
                    },
                    error: null,
                    isLoading: false,
                  });
                },
                () => {
                  setLocationData({
                    coordinates: null,
                    error: "Location still unavailable. Please check GPS settings.",
                    isLoading: false,
                  });
                },
                { enableHighAccuracy: false, timeout: 7000, maximumAge: 60000 }
              );
              return;
            case error.TIMEOUT:
              errorMessage = "Location request timed out. Try again.";
              break;
            default:
              errorMessage = "An unknown location error occurred.";
          }

          setLocationData({
            coordinates: null,
            error: errorMessage,
            isLoading: false,
          });
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    } catch (err) {
      setLocationData({
        coordinates: null,
        error: "Failed to retrieve location. Please try again.",
        isLoading: false,
      });
    }
  };

  // **Delay initial request until user clicks**
  useEffect(() => {
    getLocation();
  }, []);

  return {
    ...locationData,
    getLocation,
  };
}
