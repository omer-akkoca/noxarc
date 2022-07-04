import AsyncStorage from '@react-native-async-storage/async-storage';

const prefix = '@CUSTOM_PREFIX';

const storage = {
    setItem: async (key, value) => {
        try {
            const k = `${prefix}:${key}`;
            const v = { data: value };

            await AsyncStorage.setItem(k, JSON.stringify(v));
             
            return true;
        } catch (e) {
            return false;
        }
    },
    getItem: async (key, defaultValue = false) => {
        try {
            const value = await AsyncStorage.getItem(`${prefix}:${key}`);
            if (value === null) {
                return defaultValue;
            }

            return JSON.parse(value).data;
        } catch (error) {
            // eslint-disable-line no-unused-vars
            return defaultValue;
        }
    },
    removeItem: async key => {
        try {
            await AsyncStorage.removeItem(`${prefix}:${key}`);
        } catch (error) {
            return error;
        }
    }
}

export default storage;