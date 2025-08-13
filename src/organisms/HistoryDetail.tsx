import { useEffect, useState } from "react";
import Box from "../components//Box";
import type { IVisitor } from "../types/RegisterVisitor";
import { getStorageItem } from "../local-storage";
import { Label } from "../components//Label";
import { formatDateTime } from "../utils/format-date";
import { colors } from "../styles/colors";

export const HistoryDetail = () => {
  const [history, setHistory] = useState<IVisitor[]>([]);

  useEffect(() => {
    const storedHistory = getStorageItem<IVisitor[]>("history") || [];
    setHistory(storedHistory);
  }, []);

  return (
    <Box flex flexDirection="column" pL={30}>
      <Label weight={500} color={colors.fluorescentGreen} size="24px">Histórico</Label>
      {history.length > 0 ? (
        <Box flex flexDirection="column" pL={10}>
          {history.map((visitor: IVisitor) => (
            <Box flex flexDirection="row" justifyContent="space-between" mT={10}>
              <Box flex flexDirection="row" justifyContent="space-between">
                <Label>{`${visitor.name} - Sala: ${visitor.room}`}</Label>
              </Box>
              <Box flex flexDirection="row" justifyContent="space-between">
                <Label>{`Entrada: ${formatDateTime(visitor.input)}`}</Label>
                {visitor.output && <Label>{`Saída: ${formatDateTime(visitor.output)}`}</Label>}
              </Box>
            </Box>
          ))}
        </Box>
      ) : <Label>Histórico vazio</Label>}
    </Box>
  );
};