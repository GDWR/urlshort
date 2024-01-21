FROM node:20-alpine as BUILDER

COPY . .
RUN yarn install
RUN yarn build

FROM node:20-alpine 

COPY --from=BUILDER .output .output

EXPOSE 3000 
ENTRYPOINT ["node", ".output/server/index.mjs"]
