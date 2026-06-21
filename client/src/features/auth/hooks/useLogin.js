import { useMutation } from "@tanstack/react-query";
import { login } from "../api/login";

/** Mutation for logging in. The caller handles success (store token, navigate). */
export function useLogin() {
  return useMutation({ mutationFn: login });
}
