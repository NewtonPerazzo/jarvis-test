import { useEffect, useState } from "react";
import Box from "../components//Box";
import type { IRoom, IVisitor } from "../types/RegisterVisitor";
import { getStorageItem } from "../local-storage";
import { Label } from "../components//Label";
import { formatDateTime } from "../utils/format-date";
import Divider from "../components/Divider";
import { colors } from "../styles/colors";

type VisitorsByRoom = {
  [roomId: string]: IVisitor[];
};

export const RoomDetail = () => {
  const [rooms, setRooms] = useState<IRoom[]>([]);
  const [visitorsByRoom, setVisitorsByRoom] = useState<VisitorsByRoom>({});

  useEffect(() => {
    const storedRooms = getStorageItem<IRoom[]>("rooms") || [];
    setRooms(storedRooms);

    const storedVisitors = getStorageItem<IVisitor[]>("visitors") || [];

    const grouped: VisitorsByRoom = storedVisitors.reduce((acc, visitor) => {
      if (!acc[visitor.room]) acc[visitor.room] = [];
      acc[visitor.room].push(visitor);
      return acc;
    }, {} as VisitorsByRoom);

    setVisitorsByRoom(grouped);
  }, []);

  return (
    <Box flex flexDirection="column" pL={30}>
      <Label weight={500} color={colors.fluorescentGreen} size="24px">Visitantes por sala</Label>
      {rooms.length === 0 && <Label>Nenhuma sala cadastrada.</Label>}

      {rooms.map((room) => (
        <Box key={room.id} flex flexDirection="column" mT={10} pL={10}>
          <Label style={{ fontWeight: "bold" }}>
            {room.name} (Visitantes: {visitorsByRoom[room.id]?.length || 0})
          </Label>

          {visitorsByRoom[room.id] && visitorsByRoom[room.id].length > 0 ? (
            visitorsByRoom[room.id].map((visitor) => (
              <Box key={visitor.cpf} flex justifyContent="space-between" mT={5}>
                <Label>{visitor.name}</Label>
                <Label>{`Entrada: ${formatDateTime(visitor.input)}`}</Label>
                {visitor.output && <Label>{`Saída: ${formatDateTime(visitor.output)}`}</Label>}
              </Box>
            ))
          ) : (
            <Label>Nenhum visitante nesta sala</Label>
          )}

          <Divider />
        </Box>
      ))}
    </Box>
  );

};