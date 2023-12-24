import "@testing-library/jest-dom";

import { beforeAll, afterEach, afterAll } from "vitest";
import { server } from "./src/mocks/server";

// 모든 테스트 전에 api설치한다
beforeAll(() => server.listen());
// 테스트간 핸들러간 리셋하는 함수
afterEach(() => server.resetHandlers());
// 종료때 클린업해주는 함수
afterAll(() => server.close());
