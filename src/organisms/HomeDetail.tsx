import { useEffect, useState } from "react";
import Box from "../components//Box";
import { Button } from "../components//Button";
import { Modal } from "../molecules/Modal";
import { VisitorForm } from "../molecules/VisitorForm";
import type { IRoom, IVisitor } from "../types/RegisterVisitor";
import { getStorageItem, setStorageItem } from "../local-storage";
import { Label } from "../components//Label";
import { colors } from "../styles/colors";
import { addLog } from "../utils/logs";

const LIMIT_ROOM_VISITORS = 3;

export const HomeDetail = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [visitors, setVisitors] = useState<IVisitor[]>([]);
  
  const rooms: IRoom[] = [
    { id: '1', name: "Sala 1", visitors: 0 },
    { id: '2', name: "Sala 2", visitors: 0 },
    { id: '3', name: "Sala 3", visitors: 0 },
  ];

  const storedRooms = getStorageItem<IRoom[]>("rooms") || rooms;
  const storedVisitors = getStorageItem<IVisitor[]>("visitors") || [];

  const handleSubmit = (data: IVisitor) => {
    data.input = new Date().toISOString();
    const selectedRoom = storedRooms.find(r => r.id === data.room);

    if (!selectedRoom) {
      addLog(`Erro na entrada de visitante: sala não encontrada`);
      alert("Sala não encontrada.");
      return;
    }

    if (selectedRoom.visitors >= LIMIT_ROOM_VISITORS) {
      addLog(`Erro na entrada de visitante: sala "${selectedRoom.name}" cheia`);
      alert(`A sala "${selectedRoom.name}" está cheia!`);
      return;
    }

    const updatedRooms = storedRooms.map(r =>
      r.id === selectedRoom.id ? { ...r, visitors: r.visitors + 1 } : r
    );

    const updatedVisitors = [...storedVisitors, data];

    const storedHistory = getStorageItem<IVisitor[]>("history") || [];
    const newHistory = [...storedHistory, data];

    setStorageItem("rooms", updatedRooms);
    setStorageItem("visitors", updatedVisitors);
    setStorageItem("history", newHistory);

    setVisitors(updatedVisitors);
    setIsOpen(false);
    addLog(`Visitante ${data.name} entrou na sala ${selectedRoom.name}`);
  };


  const handleRemoveVisitor = (cpf?: string) => {
    if (!cpf) return;

    const visitorToBeRemoved = storedVisitors.find(visitor => visitor.cpf === cpf);
    if (!visitorToBeRemoved) return;

    const visitorWithOutput = { ...visitorToBeRemoved, output: new Date().toISOString() };

    const updatedVisitors = storedVisitors.filter(visitor => visitor.cpf !== cpf);

    const updatedRooms = storedRooms.map(room =>
      room.id === visitorToBeRemoved.room
        ? { ...room, visitors: Math.max(0, room.visitors - 1) }
        : room
    );

    const storedHistory = getStorageItem<IVisitor[]>("history") || [];

    const newHistory = [
      ...storedHistory.filter(visitor => visitor.cpf !== cpf), 
      visitorWithOutput
    ];

    setStorageItem("visitors", updatedVisitors);
    setStorageItem("rooms", updatedRooms);
    setStorageItem("history", newHistory);

    setVisitors(updatedVisitors);
    addLog(`Visitante ${visitorToBeRemoved.name} saiu da sala ${visitorToBeRemoved.room}`);
  };


  useEffect(() => {
    setVisitors(storedVisitors);
  }, []);

  return (
    <div>
      <Box flex justifyContent="space-between" pL={30}>
        <Label weight={500} color={colors.fluorescentGreen} size="24px">
          Visitantes {visitors.length ? ` - ${visitors.length}` : ""}
        </Label>
        <Button onClick={() => setIsOpen(true)}>Cadastrar visitante</Button>
      </Box>

      
      <Box flex flexDirection="column" mT={20} pL={50}>
        {visitors.length > 0 ? (
          visitors.map((visitor: IVisitor) => (
            <Box flex flexDirection="row" justifyContent="space-between" mT={10}>
              <Label>{`${visitor.name} - Sala: ${visitor.room}`}</Label>
              <Button onClick={() => handleRemoveVisitor(visitor.cpf)}>Registrar saída</Button>
            </Box>
          ))
        ) : (
          <Label>Visitantes vazios</Label>
        )}
      </Box>
      

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <VisitorForm
          rooms={rooms}
          onSubmit={handleSubmit}
        />
      </Modal>
    </div>
  );
};