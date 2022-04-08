import { Action, action, createStore, createTypedHooks } from "easy-peasy";
import { IUserLoc, mapView } from "../types/interfaces";

interface Store {
  nearbyDistance: string;
  setNearbyDistance: Action<Store, string>;

  searchPrinterOnMap: {
    center: {
      lat: number | undefined;
      lng: number | undefined;
    };
    isSearching: boolean;
  };
  setSearchPrinterOnMap: Action<
    Store,
    {
      center: {
        lat: number | undefined;
        lng: number | undefined;
      };
      isSearching: boolean;
    }
  >;

  mapView: mapView;
  setMapView: Action<Store, mapView>;
}

export const globalState = createStore<Store>({
  nearbyDistance: "300000",
  setNearbyDistance: action((state, payload) => {
    state.nearbyDistance = payload;
  }),

  searchPrinterOnMap: {
    center: { lat: undefined, lng: undefined },
    isSearching: false,
  },
  setSearchPrinterOnMap: action((state, payload) => {
    state.searchPrinterOnMap = {
      ...payload,
    };
  }),

  mapView: {
    center: {
      lat: 37.5810136,
      lng: 127.0654743,
    },
    viewLevel: 6,
    hasChangedCenter: false,
    hasAllowedGeo: false,
  },
  setMapView: action((state, payload) => {
    state.mapView = {
      ...payload,
    };
  }),
});

const typedHooks = createTypedHooks<Store>();
export const useStoreState = typedHooks.useStoreState;
export const useStoreActions = typedHooks.useStoreActions;

export default globalState;
