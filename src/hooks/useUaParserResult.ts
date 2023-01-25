import { useEffect, useState } from "react";
import UAParser from "ua-parser-js";

export const useUaParserResult = () => {
  const [loading, setLoading] = useState(true);

  const [result, setResult] = useState<UAParser.IResult | null>(null);

  useEffect(() => {
    const parser = new UAParser(navigator.userAgent);
    setResult(parser.getResult());
    setLoading(false);
  }, []);

  return { loading, result };
};
