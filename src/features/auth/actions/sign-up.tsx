'use server'

import { createUser, sessionService } from '@/entities/user/server';
import { redirect } from 'next/navigation';
import { z } from 'zod';


const formDataSchema = z.object({
    login: z.string().min(3),
    password: z.string().min(3)
})

export const signUpAction = async (state: unknown, formData: FormData) => {
    const data = Object.fromEntries(formData.entries());

    const result = formDataSchema.safeParse(data);
    if (!result.success) {
        const formatedErrors = result.error.format();
        return {
            formData: formData,
            errors: {
                login: formatedErrors.login?._errors.join(', '),
                password: formatedErrors.password?._errors.join(', '),
                _errors: formatedErrors._errors?.join(', '),
            }
        }
    }

    const craeteUserRes = await createUser(result.data);

    if (craeteUserRes.type === 'right') {
        await sessionService.addSession(craeteUserRes.value);

        redirect('/');
    }

    const errors = {
        'user-login-exists': 'User Exists'
    }[craeteUserRes.error]

    return {
        formData: formData,
        errors: {
            _errors: errors,
        }
    }
}