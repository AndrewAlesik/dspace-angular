import { Observable } from 'rxjs';
import { link } from '../../cache/builders/build-decorators';

import { CacheableObject } from '../../cache/object-cache.reducer';
import { DSpaceObject } from '../../shared/dspace-object.model';
import { RemoteData } from '../../data/remote-data';
import { HALLink } from '../../shared/hal-link.model';
import { WorkflowItem } from '../../submission/models/workflowitem.model';
import { ResourceType } from '../../shared/resource-type';
import { EPerson } from '../../eperson/models/eperson.model';
import { Group } from '../../eperson/models/group.model';

/**
 * An abstract model class for a TaskObject.
 */
export class TaskObject extends DSpaceObject implements CacheableObject {
  static type = new ResourceType('taskobject');

  /**
   * The task identifier
   */
  id: string;

  /**
   * The workflow step
   */
  step: string;

  /**
   * The task action type
   */
  action: string;

  /**
   * The group of this task
   */
  @link(EPerson.type)
  eperson?: Observable<RemoteData<EPerson>>;

  /**
   * The group of this task
   */
  @link(Group.type)
  group?: Observable<RemoteData<Group>>;

  /**
   * The workflowitem object whom this task is related
   */
  @link(WorkflowItem.type)
  workflowitem?: Observable<RemoteData<WorkflowItem>> | WorkflowItem;

  _links: {
    self: HALLink,
    eperson: HALLink,
    group: HALLink,
    workflowitem: HALLink,
  }

}
