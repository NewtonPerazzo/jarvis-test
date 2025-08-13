import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import type { IRoom } from '../types/RegisterVisitor';
import { Form } from '../components//Form';
import { Label } from '../components//Label';
import { Input } from '../components//Input';
import { ErrorLabel } from '../components//ErrorLabel';
import { Select } from '../components//Select';
import { Button } from '../components//Button';
import Box from '../components//Box';

interface FormData {
  name: string;
  cpf: string;
  room: string;
  birth?: string;
  email?: string;
}

interface VisitorFormProps {
  rooms: IRoom[];
  onSubmit: SubmitHandler<FormData>;
}

export const VisitorForm = ({ rooms, onSubmit }: VisitorFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Box flex justifyContent="space-between" alignItems="flex-start">
        <Box width="50%">
          <Label required htmlFor="name">Nome</Label>
        </Box>
        <Box width="50%" flex flexDirection="column">
          <Input
            id="name"
            {...register('name', { required: 'Nome é obrigatório' })}
          />
          {errors.name && <ErrorLabel>{errors.name.message}</ErrorLabel>}
        </Box>
      </Box>

      <Box flex justifyContent="space-between" alignItems="flex-start">
        <Box width="50%">
          <Label required htmlFor="cpf">CPF</Label>
        </Box>
        <Box width="50%" flex flexDirection="column">
          <Input
            id="cpf"
            {...register('cpf', { required: 'CPF é obrigatório' })}
          />
          {errors.cpf && <ErrorLabel>{errors.cpf.message}</ErrorLabel>}
        </Box>
      </Box>

      <Box flex justifyContent="space-between" alignItems="flex-start">
        <Box width="50%">
          <Label required htmlFor="room">Sala Destino</Label>
        </Box>
        <Box width="50%" flex flexDirection="column">
          <Select
            id="room"
            defaultValue=""
            {...register('room', { required: 'Selecione uma sala' })}
          >
            <option value="" disabled>
              Selecione a sala
            </option>
            {rooms.map((sala: IRoom) => (
              <option key={sala.id} value={sala.id}>
                {sala.name}
              </option>
            ))}
          </Select>
          {errors.room && <ErrorLabel>{errors.room.message}</ErrorLabel>}
        </Box>
      </Box>

      <Box flex justifyContent="space-between" alignItems="flex-start">
        <Box width="50%">
          <Label htmlFor="birth">Data de Nascimento</Label>
        </Box>
        <Box width="50%">
          <Input id="birth" type="date" {...register('birth')} />
        </Box>
      </Box>

      <Box flex justifyContent="space-between" alignItems="flex-start">
        <Box width="50%">
          <Label htmlFor="email">E-mail</Label>
        </Box>
        <Box width="50%" flex flexDirection="column">
          <Input
            id="email"
            type="email"
            {...register('email', {
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Email inválido',
              },
            })}
          />
          {errors.email && <ErrorLabel>{errors.email.message}</ErrorLabel>}
        </Box>
      </Box>

      <Button type="submit">Cadastrar</Button>
    </Form>

  );
}
