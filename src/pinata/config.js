import { pinataConfig } from './pinata-config.js';
import { PinataSDK } from 'pinata';

const projectPinata = new PinataSDK({
    pinataJwt: pinataConfig.jwt,
    pinataGateway: pinataConfig.gateway
});

export { projectPinata };