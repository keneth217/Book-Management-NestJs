import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';
import { Profile } from 'passport';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    @Inject('AUTH_SERVICE')
    private readonly authService: AuthService,
  ) {
    super({
      clientID:
        '176020291878-2ujh99gvavo3b6daf30itomfrdfhad6c.apps.googleusercontent.com', // Replace with actual Google Client ID
      clientSecret: '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', // Replace with actual Google Client Secret
      // clientID: process.env.GOOGLE_CLIENT_ID, // Replace with actual Google Client ID
      // clientSecret: process.env.GOOGLE_CLIENT_SECRET, // Replace with actual Google Client Secret
      callbackURL: 'http://localhost:4000/api/auth/google/redirect', // Must match redirect URI set in Google Console
      scope: ['profile', 'email'], // Scopes for Google OAuth2
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    const user = await this.authService.validateGoogleUser({
      email: profile.emails[0].value,
      name: profile.displayName,
    });

    console.log(user);
    // Pass user data to the next step
    return user || null;
  }
}
