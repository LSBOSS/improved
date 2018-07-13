import { stringify } from "query-string"
import { post, get } from "../ajax"
import { IStringIndexed } from "../types"

export interface ITokenAnswer {
  access_token: string
  refresh_token: string
}

export interface IOauth2Config {
  clientID: string
  clientSecret: string
  redirectURI: string
  tokenURL: string
  authorizeURL: string
}

export class RefreshTokenExpiredError extends Error {
  constructor() {
    super("Refresh Token Expired")
  }
}

export default class Oauth2 {
  private basicAuthHeaders: { Authorization: string }

  private lastToken?: ITokenAnswer
  private fetchingToken?: Promise<ITokenAnswer>

  constructor(private config: IOauth2Config) {
    const basicAuth = Buffer.from(
      `${this.config.clientID}:${this.config.clientSecret}`
    ).toString("base64")

    this.basicAuthHeaders = {
      Authorization: `Basic ${basicAuth}`
    }
  }

  /**
   * @throws RefreshTokenExpiredError if no refreshToken has expired and no `code` param is given
   */
  public async requestToken(code?: string): Promise<ITokenAnswer> {
    if (this.fetchingToken) return this.fetchingToken

    if (!code) throw new RefreshTokenExpiredError()

    const form = {
      code,
      redirect_uri: this.config.redirectURI,
      grant_type: "authorization_code"
    }

    this.fetchingToken = post(
      this.config.tokenURL,
      form,
      true,
      this.basicAuthHeaders
    ) as Promise<ITokenAnswer>

    try {
      const tokenAnswer = await this.fetchingToken
      this.lastToken = tokenAnswer
      return tokenAnswer
    } catch (e) {
      // Access token expired
      if (this.lastToken) {
        try {
          this.fetchingToken = this.refreshToken(this.lastToken.refresh_token)
          return this.fetchingToken
        } catch (e) {
          // Refresh token expired
          return this.requestToken(code)
        }
      }
    }
    return this.fetchingToken
  }

  public async requestAuth(state: string, query?: IStringIndexed) {
    return get(this.getRequestAuthURL(state, query))
  }

  public getRequestAuthURL(state: string, query?: IStringIndexed) {
    const { redirectURI, clientID, authorizeURL } = this.config
    const qs = stringify({
      client_id: clientID,
      response_type: "code",
      redirect_uri: redirectURI,
      state,
      ...query
    })

    return `${authorizeURL}?${qs}`
  }

  private async refreshToken(refreshToken: string): Promise<ITokenAnswer> {
    const form = {
      grant_type: "refresh_token",
      refresh_token: refreshToken
    }

    return post(
      this.config.tokenURL,
      form,
      true,
      this.basicAuthHeaders
    ) as Promise<ITokenAnswer>
  }
}
