import {computed} from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { email as emailValidator } from '@vuelidate/validators'

export default function useEmailValidator (email) {
    const rules = computed(() => ({
        email: {
            emailValidator
        },
    }))
    const v$ = useVuelidate(rules, email)
    const isValid = async () => {
        const result = await v$.value.$validate()
        return result
    }
    return {
        isValid,
        v$
    }
}