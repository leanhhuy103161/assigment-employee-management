import { DATA_SOURCE_URL, PATHS } from "@/common/constant";
import { EmployeeProps } from "@/common/interfaces";
import { NextApiRequest, NextApiResponse } from "next";

const METHOD = {
  GET: "GET",
  PUT: "PUT",
  DELETE: "DELETE",
};

const METHOD_MAPPING = {
  [METHOD.GET]: async (_req: Request, _res: NextApiResponse) => {
    const id = _res.params.id;

    const response = await fetch(
      `${DATA_SOURCE_URL}/${PATHS.GET_DETAIL}/${id}`
    );
    return _res.status(200).json(await response.json());
  },
  [METHOD.PUT]: async (_req: Request, _res: NextApiResponse) => {
    const { searchParams } = new URL(_req.url);
    const id = searchParams.get("id");

    const body: EmployeeProps = await _req.json();

    const response = await fetch(`${DATA_SOURCE_URL}/${PATHS.PUT}/${id}`, {
      method: "PUT",
      body: JSON.stringify(body),
    });

    return _res.status(200).json(await response.json());
  },
  [METHOD.DELETE]: async (_req: Request, _res: NextApiResponse) => {
    const { searchParams } = new URL(_req.url);
    const id = searchParams.get("id");

    const response = await fetch(`${DATA_SOURCE_URL}/${PATHS.DELETE}/${id}`, {
      method: "DELETE",
    });

    return _res.status(200).json({ ...(await response.json()) });
  },
};

export default function handler(_req: Request, _res: NextApiResponse) {
  return METHOD_MAPPING[_req.method](_req, _res);
}
