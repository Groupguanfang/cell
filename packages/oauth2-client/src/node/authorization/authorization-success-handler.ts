import { AuthorizationSuccessHandler, AuthorizedClient, AuthorizedClientManager } from './authorization-protocol';
import { Authentication } from '@malagu/security';
import { Component, Autowired } from '@malagu/core';

@Component(AuthorizationSuccessHandler)
export class DefaultAuthorizationSuccessHandler implements AuthorizationSuccessHandler {

    @Autowired(AuthorizedClientManager)
    protected readonly authorizedClientManager: AuthorizedClientManager<AuthorizedClient>;

    onAuthorizationSuccess(authorizedClient: AuthorizedClient, principal: Authentication): Promise<void> {
        return this.authorizedClientManager.save(authorizedClient, principal.name);
    }

}
