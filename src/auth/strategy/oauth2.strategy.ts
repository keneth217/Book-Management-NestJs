import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';
import { Profile } from 'passport';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {
    super({
      clientID: configService.get<string>('OAUTH2_CLIENT_ID'), // Use ConfigService
      clientSecret: configService.get<string>('OAUTH2_CLIENT_SECRET'), // Use ConfigService
      callbackURL: configService.get<string>('GOOGLE_CALLBACK_URL'), // Default fallback
      scope: ['profile', 'email'], // Scopes for Google OAuth2
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    // Safely extract email, name, userName, and picture with fallback values
    const email = profile.emails?.[0]?.value;
    const name = profile.displayName || 'No name provided';
    const userName = profile.name?.givenName || 'No name provided';
    const picture = profile.photos?.[0]?.value || 'default-profile-pic-url'; // Add fallback if no photo is available

    // Validate email presence
    if (!email) {
      console.error('Error: Missing email in Google profile.');
      throw new Error('Missing email in Google profile');
    }

    console.log('Google profile received:', profile);

    // Pass the extracted details to the AuthService for user validation/creation
    const user = await this.authService.validateGoogleUser({
      email,
      name,
      userName,
      picture,
    });

    console.log('User validated:', user);

    // Return the user object or null if not found
    return user || null;
  }
}
