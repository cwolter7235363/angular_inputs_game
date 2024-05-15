import { Component, Input } from '@angular/core';
@Component({
    standalone: true,
    selector: 'app-login-form',
    template: `
        <div class="w-full max-w-md mx-auto mb-6">
            <div class="mb-4">
                <input
                    class="p-2 w-full bg-gray-200 placeholder-gray-900 rounded border focus:border-teal-500"
                    type="text"
                    autocomplete="email"
                    placeholder="Email"
                />
            </div>
            <div class="mb-4">
                <input
                    class="p-2 w-full bg-gray-200 placeholder-gray-900 rounded border focus:border-teal-500"
                    type="password"
                    autocomplete="current-password"
                    placeholder="Password"
                />
            </div>

            <div class="flex justify-end mb-4 text-primary">
                <input id="remember-me" type="checkbox" class="mr-2" />
                <label for="remember-me">Remember me!</label>
            </div>

            <button class="w-full bg-gray-800 text-white p-2 rounded font-semibold hover:bg-gray-900 mb-4">
                Log In
            </button>

            <button class="w-full bg-gray-800 text-white p-2 rounded font-semibold hover:bg-gray-900 flex items-center justify-center">
                login Sign in with Google
            </button>
        </div>

        <div class="text-right text-white mb-6">
            <a class="text-sm font-bold hover:underline cursor-pointer">Forgot your password?</a>
        </div>
    `,
})
export class LoginForm {
    // Function to handle Google login
    onGoogleLogin() {
        // Implement Google login functionality here
    }
}