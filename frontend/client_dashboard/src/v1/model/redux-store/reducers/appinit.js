import { ai } from '../constants';

const { S_A_I } = ai;

export const appinit = (state = false, action) => {
    switch(action.type) {
        case S_A_I: {
            return action.value
        }
        default: {
            return state;
        }
    }
}