import axios from "axios";
import { IGarage } from "../models/garageModel";

export const getLimitGarages = async (limit: number): Promise<IGarage[]> => {
  try {
    const url = `https://data.gov.il/api/3/action/datastore_search?resource_id=bb68386a-a331-4bbc-b668-bba2766d517d&limit=${limit}`;
    const response = await axios.get(url);
    const garages = response.data.result.records;

    const validGarages: IGarage[] = garages.filter((garage: any) => {
      return (
        typeof garage._id === "number" &&
        typeof garage.mispar_mosah === "number" &&
        typeof garage.shem_mosah === "string" &&
        typeof garage.cod_sug_mosah === "number" &&
        typeof garage.sug_mosah === "string" &&
        typeof garage.ktovet === "string" &&
        typeof garage.yishuv === "string" &&
        typeof garage.telephone === "string" &&
        typeof garage.mikud === "number" &&
        typeof garage.cod_miktzoa === "number" &&
        typeof garage.miktzoa === "string" &&
        typeof garage.menahel_miktzoa === "string" &&
        typeof garage.rasham_havarot === "number" &&
        (typeof garage.TESTIME === "string" ||
          typeof garage.TESTIME === "undefined")
      );
    });

    return validGarages;
  } catch (error) {
    console.error("Error fetching garages:", error);
    throw new Error("Error fetching garages");
  }
};

export const getAllGarages = async (): Promise<IGarage[]> => {
  try {
    const url = `https://data.gov.il/api/3/action/datastore_search?resource_id=bb68386a-a331-4bbc-b668-bba2766d517d`;
    const response = await axios.get(url);
    const garages = response.data.result.records;

    const validGarages: IGarage[] = garages.filter((garage: any) => {
      return (
        typeof garage._id === "number" &&
        typeof garage.mispar_mosah === "number" &&
        typeof garage.shem_mosah === "string" &&
        typeof garage.cod_sug_mosah === "number" &&
        typeof garage.sug_mosah === "string" &&
        typeof garage.ktovet === "string" &&
        typeof garage.yishuv === "string" &&
        typeof garage.telephone === "string" &&
        typeof garage.mikud === "number" &&
        typeof garage.cod_miktzoa === "number" &&
        typeof garage.miktzoa === "string" &&
        typeof garage.menahel_miktzoa === "string" &&
        typeof garage.rasham_havarot === "number" &&
        (typeof garage.TESTIME === "string" ||
          typeof garage.TESTIME === "undefined")
      );
    });

    return validGarages;
  } catch (error) {
    console.error("Error fetching garages:", error);
    throw new Error("Error fetching garages");
  }
};
