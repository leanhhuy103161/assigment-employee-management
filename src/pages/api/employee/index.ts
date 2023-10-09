import { DATA_SOURCE_URL, PATHS, REVALIDATE } from "@/common/constant";
import { NextApiResponse } from "next";

const METHOD = {
  POST: "POST",
  GET: "GET",
};

const METHOD_MAPPING = {
  [METHOD.GET]: async (_, _res: NextApiResponse) => {
    const response = await fetch(`${DATA_SOURCE_URL}/${PATHS.GET}`);

    return _res.status(200).json(await response.json());
  },
  [METHOD.POST]: async (_req: Request, _res: NextApiResponse) => {
    const { searchParams } = new URL(_req.url);
    const id = searchParams.get("id");

    const response = await fetch(`${DATA_SOURCE_URL}/${PATHS.POST}}/${id}`, {
      method: "POST",
    });

    return _res.status(200).json(response);
  },
};

export default function handler(_req: Request, _res: NextApiResponse) {
  return METHOD_MAPPING[_req.method](_req, _res);
}
