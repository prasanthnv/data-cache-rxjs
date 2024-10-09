import { Http } from "./http";
import { User, UserListResponse, UserResponse } from "./user.type";
import { BehaviorSubject, delay, distinctUntilChanged, Observable, of, switchMap, tap } from "rxjs";

export class _UserService {
  private static instance: _UserService;
  userSubject = new BehaviorSubject<User | null>(null);

  private constructor() {}

  static getInstance(): _UserService {
    if (!_UserService.instance) {
      _UserService.instance = new _UserService();
    }
    return _UserService.instance;
  }

  getUserList(): Observable<UserListResponse> {
    return Http.get<UserListResponse>("https://dummyjson.com/users");
  }

  /*
return this.$trainingPlan.pipe(
            switchMap((trainingPlan) => {
                console.log('trainingPlan ==> ', trainingPlan);
                if (!trainingPlan || trainingPlan.id !== id) {
                    console.log('fetching training plan');
                    return this.getTrainingPlan(id);
                }
                return of(trainingPlan);
            })
        )
  */

  getUserById(id: number): Observable<User> {
    //* Method 1
    // return of(this.userSubject.value).pipe(
    //     switchMap((user) => {
    //         console.log('user ==> ', user);
    //         if (user && user?.id === id) {
    //             console.log('from CACHE');
    //             return of(user);
    //         } else {
    //             console.log('from API');
    //             const subscription = this.userSubject.subscribe(); // Temporarily subscribe to avoid new emissions
    //             return Http.get<User>(`https://dummyjson.com/users/${id}`).pipe(
    //                 tap((user) => {
    //                     subscription.unsubscribe();  // Unsubscribe to avoid recursion
    //                     this.userSubject.next(user);
    //                 }),
    //             );
    //         }
    //     })
    // );
    //* Method 2
    if (this.userSubject.value && this.userSubject.value.id === id) {
        console.log('from cache');
      return of(this.userSubject.value);
    } else {
        console.log('from api');
      return Http.get<User>(`https://dummyjson.com/users/${id}`).pipe(
        tap((user) => {
            this.userSubject.next(user);
        })
      );
    }
  }


  saveUser(id: number, user: User) {
    return Http.put<User>(`https://dummyjson.com/users/${id}`, user).pipe(
        tap((user) => {
            this.userSubject.next(user);
        })
    );
  }
}

export const UserService = _UserService.getInstance();
