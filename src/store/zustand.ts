import { IPlayer } from '@/types/user.t'
import { create } from 'zustand'

export type Store = {
  player: IPlayer | false,
  setPlayer: (player: IPlayer | false) => void
}

export const useStore = create<Store>()((set) => ({
    player: false,
    setPlayer: (player: IPlayer | false) => set({ player }),
}))