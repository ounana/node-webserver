import { Controller } from '../Interface/Controller';
import DownLoad from './DownLoad';
import Restart from './Restart';
import ShutDown from './ShutDown';
import TestGet from './TestGet';
import TestJsonp from './TestJsonp';
import TestPost from './TestPost';
import UpFiles from './UpFiles';
import TestRand from './TestRand';

const CONTROLLER: Array<Controller> = [
  DownLoad,
  Restart,
  ShutDown,
  TestGet,
  TestJsonp,
  TestPost,
  UpFiles,
  TestRand
]

export default CONTROLLER